#!/usr/bin/env python3
"""
Inline page components into their route files.

Page-centric approach:
  NEW route file = route-only imports + page imports (cleaned up) +
                   Route export + transformed page function + helpers
"""
import re, os, sys, textwrap

SRC = os.path.dirname(os.path.abspath(__file__)) + "/src"

MAPPINGS = [
    # ── super-admin (no props) ───────────────────────────────────────────────
    ("routes/super-admin/index.tsx",        "pages/super-admin/super-admin-dashboard.tsx", "none"),
    ("routes/super-admin/settings.tsx",     "pages/super-admin/settings.tsx",              "none"),
    ("routes/super-admin/tenants.tsx",      "pages/super-admin/tenants.tsx",               "none"),
    ("routes/super-admin/telemetry.tsx",    "pages/super-admin/telemetry.tsx",             "none"),
    ("routes/super-admin/identities.tsx",   "pages/super-admin/identities.tsx",            "none"),
    # ── student routes ───────────────────────────────────────────────────────
    ("routes/$tenant/student/index.tsx",                               "pages/student/student-dashboard.tsx", "tenant+user"),
    ("routes/$tenant/student/courses.tsx",                             "pages/student/course-catalog.tsx",    "tenant+user"),
    ("routes/$tenant/student/live-sessions.tsx",                       "pages/student/live-sessions.tsx",     "tenant+user"),
    ("routes/$tenant/student/profile.tsx",                             "pages/student/user-profile.tsx",      "tenant+user"),
    ("routes/$tenant/student/progress.tsx",                            "pages/student/student-progress.tsx",  "tenant+user"),
    ("routes/$tenant/student/courses/$courseId.tsx",                   "pages/student/course-details.tsx",    "tenant+user"),
    ("routes/$tenant/student/courses/$courseId/learn.tsx",             "pages/student/course-view.tsx",       "tenant+user"),
    ("routes/$tenant/student/courses/$courseId/quiz/$quizId.tsx",      "pages/student/quiz-assessment.tsx",   "tenant+user"),
    # ── admin routes ─────────────────────────────────────────────────────────
    ("routes/$tenant/admin/index.tsx",                         "pages/admin/admin-dashboard.tsx",           "tenant"),
    ("routes/$tenant/admin/analytics.tsx",                     "pages/admin/analytics-reports.tsx",         "tenant"),
    ("routes/$tenant/admin/certificates.tsx",                  "pages/admin/certificates.tsx",              "tenant+user"),
    ("routes/$tenant/admin/courses.tsx",                       "pages/admin/course-management.tsx",         "tenant+user"),
    ("routes/$tenant/admin/courses/$courseId/edit.tsx",        "pages/admin/course-builder.tsx",            "tenant"),
    ("routes/$tenant/admin/live-sessions.tsx",                 "pages/admin/live-sessions.tsx",             "tenant+user"),
    ("routes/$tenant/admin/profile.tsx",                       "pages/admin/profile.tsx",                   "user"),
    ("routes/$tenant/admin/quizzes.tsx",                       "pages/admin/quiz-management.tsx",           "tenant+user"),
    ("routes/$tenant/admin/quizzes/$quizId.tsx",               "pages/admin/quiz-details.tsx",              "tenant"),
    ("routes/$tenant/admin/quizzes/$quizId/questions.tsx",     "pages/admin/quiz-question-management.tsx",  "tenant"),
    ("routes/$tenant/admin/security.tsx",                      "pages/admin/security.tsx",                  "none"),
    ("routes/$tenant/admin/settings.tsx",                      "pages/admin/settings.tsx",                  "none"),
    ("routes/$tenant/admin/users.tsx",                         "pages/admin/user-management.tsx",           "tenant+user"),
    ("routes/$tenant/admin/users/$studentId.tsx",              "pages/admin/student-details.tsx",           "tenant+user"),
    ("routes/$tenant/admin/users/$studentId/progress.tsx",     "pages/admin/student-progress-monitoring.tsx","tenant"),
    ("routes/$tenant/admin/users/new.tsx",                     "pages/admin/create-user.tsx",               "tenant"),
    # ── public routes ─────────────────────────────────────────────────────────
    ("routes/verify-certificate.tsx",     "pages/public/certificate-verification.tsx", "none"),
    ("routes/index.tsx",                  "pages/public/platform-landing.tsx",          "already_contextualized"),
    ("routes/login.tsx",                  "pages/public/platform-login-page.tsx",       "already_contextualized"),
    ("routes/$tenant/login.tsx",          "pages/public/login-page.tsx",                "already_contextualized"),
]

# ── helpers ──────────────────────────────────────────────────────────────────

def fread(path):
    with open(os.path.join(SRC, path)) as f:
        return f.read()

def fwrite(path, content):
    with open(os.path.join(SRC, path), "w") as f:
        f.write(content)

def fdel(path):
    full = os.path.join(SRC, path)
    if os.path.exists(full):
        os.remove(full)

def parse_import_blocks(text):
    """
    Parse a TS/TSX file into a list of import statement strings.
    Handles multi-line: `import {\n  Foo,\n  Bar\n} from "x";`
    Returns list of (full_import_text, module_path) tuples.
    """
    blocks = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if re.match(r'^import\b', line):
            # Collect until we find the closing `from "..."` line
            block_lines = [line]
            # Check if complete on this line
            if re.search(r'from\s+"[^"]*"', line):
                m = re.search(r'from\s+"([^"]*)"', line)
                module = m.group(1) if m else ""
                blocks.append(("\n".join(block_lines), module))
                i += 1
            else:
                # Multi-line import
                i += 1
                while i < len(lines):
                    block_lines.append(lines[i])
                    if re.search(r'from\s+"[^"]*"', lines[i]):
                        m = re.search(r'from\s+"([^"]*)"', lines[i])
                        module = m.group(1) if m else ""
                        blocks.append(("\n".join(block_lines), module))
                        i += 1
                        break
                    i += 1
        else:
            i += 1
    return blocks

def merge_imports(route_blocks, page_blocks):
    """
    Merge route and page import blocks: deduplicate by module path.
    If same module appears in both, use the route version for route-only
    modules (createFileRoute, z) and the page version for everything else.
    Page blocks win for shared modules (they may import more symbols).
    """
    route_modules = {m: t for t, m in route_blocks}
    page_modules  = {m: t for t, m in page_blocks}

    all_modules = list(dict.fromkeys(
        [m for _, m in route_blocks] + [m for _, m in page_blocks]
    ))

    result = []
    for mod in all_modules:
        if mod in ("@tanstack/react-router", "zod", "zod/v4"):
            # Route file owns these (createFileRoute, z); use route version
            if mod in route_modules:
                result.append(route_modules[mod])
        elif mod in page_modules:
            result.append(page_modules[mod])
        elif mod in route_modules:
            result.append(route_modules[mod])
    return result

def extract_route_config(route_content):
    """
    Extract the full `export const Route = createFileRoute(...)({...});` block
    from the route file. Returns the block as a string.
    """
    lines = route_content.splitlines()
    start = None
    for i, line in enumerate(lines):
        if re.match(r'^export const Route = createFileRoute\(', line):
            start = i
            break
    if start is None:
        raise ValueError("No createFileRoute found")

    # Collect lines until paren depth returns to 0
    block = []
    depth = 0
    for line in lines[start:]:
        block.append(line)
        for ch in line:
            if ch == '(':
                depth += 1
            elif ch == ')':
                depth -= 1
        if depth == 0 and block:
            break
    return "\n".join(block) + ";"  if not "\n".join(block).endswith(";") else "\n".join(block)

def find_top_fn(page_content):
    """
    Find the first `export function Name(` or `export default function Name(`
    in the file. Returns (line_index, fn_name).
    """
    lines = page_content.splitlines()
    for i, line in enumerate(lines):
        m = re.match(r'^export (?:default )?function (\w+)', line)
        if m:
            return i, m.group(1)
    raise ValueError("No export function found in page file")

def extract_fn_and_tail(page_content):
    """
    Split page content into:
      (fn_start_line_idx, fn_name, fn_lines, tail_lines)
    where fn_lines = the full function text (signature + body),
          tail_lines = everything after the function.
    """
    lines = page_content.splitlines()
    fn_start, fn_name = find_top_fn(page_content)
    fn_lines_raw = lines[fn_start:]

    # Find matching braces for the function body
    depth = 0
    end_idx = None
    found_open = False
    for i, line in enumerate(fn_lines_raw):
        for ch in line:
            if ch == '{':
                depth += 1
                found_open = True
            elif ch == '}':
                depth -= 1
        if found_open and depth == 0:
            end_idx = i
            break

    if end_idx is None:
        raise ValueError(f"Could not find end of function {fn_name}")

    fn_lines = fn_lines_raw[:end_idx + 1]
    tail_lines = fn_lines_raw[end_idx + 1:]
    return fn_start, fn_name, fn_lines, tail_lines

def transform_fn_for_inline(fn_lines, prop_type):
    """
    1. Remove 'export ' prefix.
    2. Remove props from signature (handles multi-line signatures too).
    3. Inject hook calls at the start of the function body.
    4. Fix tenant?.xxx → tenant.xxx if prop_type involves tenant.
    """
    # Join to a single string for easier regex
    text = "\n".join(fn_lines)

    # 1. Remove 'export ' prefix
    text = re.sub(r'^export (?:default )?', '', text)

    # 2. Remove the props parameter. Handles both:
    #    function Foo({ tenant, user }: SomeType) {
    #    function Foo({
    #      tenant,
    #      user: currentUser,
    #    }: SomeType) {
    props_pattern = r'\(\s*\{[^)]*\}\s*:\s*(?:TenantUserPageProps|TenantPageProps|UserPageProps)\s*\)'
    text = re.sub(props_pattern, '()', text, flags=re.DOTALL)

    # 3. Inject hooks after the opening brace of the function body
    # Find first `{` that opens the body (after the signature `)`)
    # Insert hook lines right after it
    hook_lines = []
    if prop_type in ("tenant", "tenant+user"):
        hook_lines.append('  const { tenant } = Route.useRouteContext() as { tenant: Tenant };')
    if prop_type in ("user", "tenant+user"):
        hook_lines.append('  const { user } = useAuthContext();')

    if hook_lines:
        # Find the first `{` that opens the function body
        # It comes after the `)` closing the parameters
        m = re.search(r'\)\s*\{', text)
        if m:
            insert_pos = m.end()
            injection = "\n" + "\n".join(hook_lines)
            text = text[:insert_pos] + injection + text[insert_pos:]

    # 4. Fix tenant optional chaining
    if prop_type in ("tenant", "tenant+user"):
        text = re.sub(r'\btenant\?\.([\w])', r'tenant.\1', text)

    return text

def needs_tenant_import(page_content, prop_type):
    """Check if we need to add Tenant type import."""
    if prop_type not in ("tenant", "tenant+user"):
        return False
    return "@/schemas/tenant-contract" not in page_content

def needs_auth_import(page_content, prop_type):
    """Check if we need to add useAuthContext import."""
    if prop_type not in ("user", "tenant+user"):
        return False
    return "useAuthContext" not in page_content

# ── main processing ──────────────────────────────────────────────────────────

def process_normal(route_path, page_path, prop_type):
    route_content = fread(route_path)
    page_content  = fread(page_path)

    # 1. Parse imports
    route_blocks = parse_import_blocks(route_content)
    page_blocks  = parse_import_blocks(page_content)

    # Remove route-page-props import from page
    page_blocks = [(t, m) for t, m in page_blocks if "route-page-props" not in m]

    # Add extra imports needed for hook calls
    extra = []
    if needs_tenant_import(page_content, prop_type):
        extra.append(('import type { Tenant } from "@/schemas/tenant-contract";', "@/schemas/tenant-contract"))
    if needs_auth_import(page_content, prop_type):
        extra.append(('import { useAuthContext } from "@/providers/auth-provider";', "@/providers/auth-provider"))

    # Also keep any route-specific non-page imports (like z from zod for validateSearch)
    route_extra = []
    for t, m in route_blocks:
        if m in ("zod", "zod/v4") and m not in [mod for _, mod in page_blocks]:
            route_extra.append((t, m))

    all_blocks = merge_imports(route_blocks, page_blocks) + [t for t, _ in extra]
    # Also add route_extra that didn't make it through merge
    for t, m in route_extra:
        if t not in all_blocks:
            all_blocks.append(t)

    imports_text = "\n".join(all_blocks)

    # 2. Extract Route config from route file
    route_config = extract_route_config(route_content)

    # 3. Extract and transform page function
    fn_start, fn_name, fn_lines, tail_lines = extract_fn_and_tail(page_content)
    fn_text = transform_fn_for_inline(fn_lines, prop_type)

    # Fix tenant optional chaining in tail helpers too
    if prop_type in ("tenant", "tenant+user"):
        tail_lines = [re.sub(r'\btenant\?\.([\w])', r'tenant.\1', l) for l in tail_lines]

    # 4. Update Route config: replace component: WrapperFn → component: fn_name
    route_config_updated = re.sub(r'component:\s*\w+', f'component: {fn_name}', route_config)

    # 5. Check if there's any interface/type/const BEFORE the export function in the page
    #    (e.g. interface declarations, helper constants) — keep those
    page_lines = page_content.splitlines()
    # Find end of imports block
    last_import_line = -1
    i = 0
    while i < len(page_lines):
        line = page_lines[i]
        if re.match(r'^import\b', line):
            # Scan to end of this import
            while i < len(page_lines) and 'from "' not in page_lines[i]:
                i += 1
            last_import_line = i
        i += 1

    pre_fn_content = []
    for j in range(last_import_line + 1, fn_start):
        line = page_lines[j]
        if line.strip():
            # Skip route-page-props related lines
            if "route-page-props" not in line:
                pre_fn_content.append(line)

    # 6. Assemble
    parts = [imports_text, ""]
    if pre_fn_content:
        parts.append("\n".join(pre_fn_content))
        parts.append("")
    parts.append(route_config_updated)
    parts.append("")
    parts.append(fn_text)
    tail_stripped = "\n".join(tail_lines).strip()
    if tail_stripped:
        parts.append("")
        parts.append(tail_stripped)
    parts.append("")  # trailing newline

    return "\n".join(parts), fn_name


def process_already_contextualized(route_path, page_path, prop_type):
    """
    Routes that already do their own Route.useRouteContext() — only inline
    the page function as a local helper (keep its props since route calls it).
    """
    route_content = fread(route_path)
    page_content  = fread(page_path)

    # Parse and merge imports
    route_blocks = parse_import_blocks(route_content)
    page_blocks  = parse_import_blocks(page_content)
    page_blocks  = [(t, m) for t, m in page_blocks if "route-page-props" not in m]

    merged = merge_imports(route_blocks, page_blocks)
    imports_text = "\n".join(merged)

    # Extract route content AFTER imports (everything except the page import line)
    route_lines = route_content.splitlines()
    after_imports = []
    past_imports = False
    for line in route_lines:
        if re.match(r'^import\b', line):
            # Skip imports from pages/
            if re.search(r'from\s+"@/pages/', line):
                # skip single-line import
                continue
            # For multi-line we've already captured via blocks
            continue
        if line.strip() == "" and not past_imports:
            continue
        past_imports = True
        after_imports.append(line)

    # Actually simpler: just strip import lines and keep everything else
    after_imports = []
    in_import = False
    for line in route_lines:
        stripped = line.strip()
        if re.match(r'^import\b', stripped):
            in_import = True
            # skip
            if re.search(r'from\s+"', line):
                in_import = False
            continue
        if in_import:
            if re.search(r'from\s+"', line):
                in_import = False
            continue
        after_imports.append(line)

    route_body = "\n".join(after_imports).strip()

    # Extract page function (keep as helper with its original props)
    fn_start, fn_name, fn_lines, tail_lines = extract_fn_and_tail(page_content)

    # Strip 'export ' from function
    fn_text = "\n".join(fn_lines)
    fn_text = re.sub(r'^export (?:default )?', '', fn_text)

    # Pre-fn content from page
    page_lines = page_content.splitlines()
    last_import_line = -1
    i = 0
    while i < len(page_lines):
        line = page_lines[i]
        if re.match(r'^import\b', line):
            while i < len(page_lines) and 'from "' not in page_lines[i]:
                i += 1
            last_import_line = i
        i += 1

    pre_fn_content = []
    for j in range(last_import_line + 1, fn_start):
        line = page_lines[j]
        if line.strip() and "route-page-props" not in line:
            pre_fn_content.append(line)

    parts = [imports_text, ""]
    if pre_fn_content:
        parts.append("\n".join(pre_fn_content))
        parts.append("")
    parts.append(route_body)
    parts.append("")
    parts.append(fn_text)
    tail_stripped = "\n".join(tail_lines).strip()
    if tail_stripped:
        parts.append("")
        parts.append(tail_stripped)
    parts.append("")

    return "\n".join(parts), fn_name


def main():
    dry_run = '--dry-run' in sys.argv
    errors = []

    for route_path, page_path, prop_type in MAPPINGS:
        print(f"\nProcessing: {route_path}")
        print(f"  ← {page_path} ({prop_type})")
        try:
            if prop_type == "already_contextualized":
                new_content, fn_name = process_already_contextualized(route_path, page_path, prop_type)
            else:
                new_content, fn_name = process_normal(route_path, page_path, prop_type)

            if dry_run:
                lines = new_content.splitlines()
                print(f"  [DRY RUN] {len(new_content)} chars, component: {fn_name}")
                for line in lines[:25]:
                    print(f"    {line}")
                print("    ...")
            else:
                fwrite(route_path, new_content)
                fdel(os.path.join(SRC, page_path))
                print(f"  ✓ wrote + deleted page")
        except Exception as e:
            errors.append((route_path, str(e)))
            print(f"  ERROR: {e}")
            import traceback; traceback.print_exc()

    if errors:
        print(f"\n{len(errors)} errors:")
        for p, e in errors:
            print(f"  {p}: {e}")
        sys.exit(1)
    else:
        print("\nAll done!")

if __name__ == "__main__":
    main()
