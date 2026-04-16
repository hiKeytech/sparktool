#!/usr/bin/env python3
"""
Inline page components into their route files.

Page-centric: new route file = route-only imports + page imports (cleaned) +
              Route export + transformed page function + helpers
"""
import re, os, sys

SRC = os.path.dirname(os.path.abspath(__file__)) + "/src"

MAPPINGS = [
    # super-admin (no props)
    ("routes/super-admin/index.tsx",         "pages/super-admin/super-admin-dashboard.tsx", "none"),
    ("routes/super-admin/settings.tsx",      "pages/super-admin/settings.tsx",              "none"),
    ("routes/super-admin/tenants.tsx",       "pages/super-admin/tenants.tsx",               "none"),
    ("routes/super-admin/telemetry.tsx",     "pages/super-admin/telemetry.tsx",             "none"),
    ("routes/super-admin/identities.tsx",    "pages/super-admin/identities.tsx",            "none"),
    # student
    ("routes/$tenant/student/index.tsx",                              "pages/student/student-dashboard.tsx", "tenant+user"),
    ("routes/$tenant/student/courses.tsx",                            "pages/student/course-catalog.tsx",    "tenant+user"),
    ("routes/$tenant/student/live-sessions.tsx",                      "pages/student/live-sessions.tsx",     "tenant+user"),
    ("routes/$tenant/student/profile.tsx",                            "pages/student/user-profile.tsx",      "tenant+user"),
    ("routes/$tenant/student/progress.tsx",                           "pages/student/student-progress.tsx",  "tenant+user"),
    ("routes/$tenant/student/courses/$courseId.tsx",                  "pages/student/course-details.tsx",    "tenant+user"),
    ("routes/$tenant/student/courses/$courseId/learn.tsx",            "pages/student/course-view.tsx",       "tenant+user"),
    ("routes/$tenant/student/courses/$courseId/quiz/$quizId.tsx",     "pages/student/quiz-assessment.tsx",   "tenant+user"),
    # admin
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
    # public
    ("routes/verify-certificate.tsx",   "pages/public/certificate-verification.tsx", "none"),
    ("routes/index.tsx",                "pages/public/platform-landing.tsx",          "ctx"),
    ("routes/login.tsx",                "pages/public/platform-login-page.tsx",       "ctx"),
    ("routes/$tenant/login.tsx",        "pages/public/login-page.tsx",                "ctx"),
]


# ─────────────────────────────────────────────────────────────────────────────
# File I/O
# ─────────────────────────────────────────────────────────────────────────────

def fread(rel): 
    with open(os.path.join(SRC, rel)) as f: return f.read()

def fwrite(rel, content):
    with open(os.path.join(SRC, rel), "w") as f: f.write(content)

def fdel(rel):
    full = os.path.join(SRC, rel)
    if os.path.exists(full): os.remove(full)


# ─────────────────────────────────────────────────────────────────────────────
# Import block parser
# ─────────────────────────────────────────────────────────────────────────────

def parse_import_blocks(text):
    """
    Parse all import statements (including multi-line) from file text.
    Returns list of (block_text, module_path).
    """
    result = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if re.match(r'^import\b', line):
            block = [line]
            # single-line?
            if re.search(r'from\s+"[^"]*"', line):
                m = re.search(r'from\s+"([^"]*)"', line)
                result.append(("\n".join(block), m.group(1) if m else ""))
                i += 1
            else:
                # multi-line — collect until `from "..."` appears
                i += 1
                while i < len(lines):
                    block.append(lines[i])
                    if re.search(r'from\s+"[^"]*"', lines[i]):
                        m = re.search(r'from\s+"([^"]*)"', lines[i])
                        result.append(("\n".join(block), m.group(1) if m else ""))
                        i += 1
                        break
                    i += 1
        else:
            i += 1
    return result


def filter_page_blocks(blocks):
    """Remove route-page-props import and the page import from routes."""
    return [(t, m) for t, m in blocks if "route-page-props" not in m and "@/pages/" not in m]


def merge_blocks(route_blocks, page_blocks):
    """
    Merge import blocks: deduplicate by module.
    - @tanstack/react-router and zod* come from route (we need createFileRoute/z)
    - Everything else: page version wins (it may import more symbols)
    """
    route_mod_to_text = {m: t for t, m in route_blocks}
    page_mod_to_text  = {m: t for t, m in page_blocks}

    # Ordered dedup
    seen = {}
    for t, m in route_blocks + page_blocks:
        if m not in seen:
            seen[m] = None

    result = []
    for mod in seen:
        if mod in ("@tanstack/react-router", "zod", "zod/v4"):
            if mod in route_mod_to_text:
                result.append(route_mod_to_text[mod])
        elif mod in page_mod_to_text:
            result.append(page_mod_to_text[mod])
        elif mod in route_mod_to_text:
            result.append(route_mod_to_text[mod])
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Route config extractor
# ─────────────────────────────────────────────────────────────────────────────

def extract_route_config(route_content):
    """
    Extract `export const Route = createFileRoute(...)({...});` from route file.
    Returns the full block as a string (ending with ;).
    """
    lines = route_content.splitlines()
    start = None
    for i, line in enumerate(lines):
        if re.match(r'^export const Route = createFileRoute\(', line):
            start = i; break
    if start is None:
        raise ValueError("createFileRoute not found in route file")

    block = []
    depth = 0
    for line in lines[start:]:
        block.append(line)
        for ch in line:
            if ch == '(': depth += 1
            elif ch == ')': depth -= 1
        if depth == 0 and block:
            break
    text = "\n".join(block)
    if not text.rstrip().endswith(";"):
        text = text.rstrip() + ";"
    return text


# ─────────────────────────────────────────────────────────────────────────────
# Page function extractor + transformer
# ─────────────────────────────────────────────────────────────────────────────

def find_export_fn(page_lines):
    """Find index and name of the first `export function` in page_lines."""
    for i, line in enumerate(page_lines):
        m = re.match(r'^export (?:default )?function (\w+)', line)
        if m:
            return i, m.group(1)
    raise ValueError("No `export function` found")


def extract_fn_block(page_lines, fn_start):
    """
    Starting from fn_start, collect lines until the function's matching `}`.
    Returns (fn_lines, tail_lines).
    """
    depth = 0
    opened = False
    end = None
    for i in range(fn_start, len(page_lines)):
        for ch in page_lines[i]:
            if ch == '{': depth += 1; opened = True
            elif ch == '}': depth -= 1
        if opened and depth == 0:
            end = i; break
    if end is None:
        raise ValueError("Could not find end of function")
    return page_lines[fn_start:end+1], page_lines[end+1:]


def transform_fn(fn_lines, fn_name, prop_type):
    """
    Transform the page function for inline use:
    1. Remove `export ` prefix.
    2. Remove props destructuring: `({ a, b }: SomeType)` → `()`.
    3. Inject hook calls at start of function body.
    4. Fix `tenant?.xxx` → `tenant.xxx` when tenant is guaranteed.
    Returns the transformed function as a string.
    """
    text = "\n".join(fn_lines)

    # 1. Remove export
    text = re.sub(r'^export (?:default )?', '', text)

    # 2. Remove props: handles single-line and multi-line destructuring
    #    Pattern: ({ ... }: PropsType)  (possibly spanning multiple lines)
    text = re.sub(
        r'\(\s*\{[^)]*?\}\s*:\s*(?:TenantUserPageProps|TenantPageProps|UserPageProps)\s*\)',
        '()',
        text,
        flags=re.DOTALL
    )

    # 3. Inject hooks right after the opening `{` of the function body
    hooks = []
    if prop_type in ("tenant", "tenant+user"):
        hooks.append('  const { tenant } = Route.useRouteContext() as { tenant: Tenant };')
    if prop_type in ("user", "tenant+user"):
        hooks.append('  const { user } = useAuthContext();')

    if hooks:
        # Insert after the `{` that opens the function body
        # That's the first `{` after the `)` closing the params
        m = re.search(r'\)\s*\{', text)
        if m:
            pos = m.end()
            text = text[:pos] + "\n" + "\n".join(hooks) + text[pos:]

    # 4. Fix tenant optional chaining
    if prop_type in ("tenant", "tenant+user"):
        text = re.sub(r'\btenant\?\.([\w])', r'tenant.\1', text)

    return text


def get_pre_fn_content(page_lines, last_import_end, fn_start):
    """
    Return lines between imports and the export function
    (e.g. interface declarations, helper constants).
    """
    lines = []
    for line in page_lines[last_import_end+1 : fn_start]:
        if "route-page-props" not in line:
            lines.append(line)
    # Strip leading/trailing blank lines
    while lines and not lines[0].strip(): lines.pop(0)
    while lines and not lines[-1].strip(): lines.pop()
    return lines


def find_last_import_end(page_lines):
    """Find the last line index that is part of any import statement."""
    last = -1
    in_import = False
    for i, line in enumerate(page_lines):
        if re.match(r'^import\b', line):
            in_import = True
        if in_import:
            last = i
            if re.search(r'from\s+"', line):
                in_import = False
    return last


# ─────────────────────────────────────────────────────────────────────────────
# Process a normal route (thin wrapper → page component)
# ─────────────────────────────────────────────────────────────────────────────

def process_normal(route_path, page_path, prop_type):
    route_content = fread(route_path)
    page_content  = fread(page_path)
    page_lines    = page_content.splitlines()

    # Import blocks
    route_blocks = parse_import_blocks(route_content)
    route_blocks = filter_page_blocks(route_blocks)   # also strip @/pages/ from route
    page_blocks  = parse_import_blocks(page_content)
    page_blocks  = filter_page_blocks(page_blocks)

    # Add Tenant type import if needed
    page_mods = {m for _, m in page_blocks}
    if prop_type in ("tenant", "tenant+user") and "@/schemas/tenant-contract" not in page_mods:
        page_blocks.append(('import type { Tenant } from "@/schemas/tenant-contract";', "@/schemas/tenant-contract"))

    # Add useAuthContext import if needed
    if prop_type in ("user", "tenant+user") and "@/providers/auth-provider" not in page_mods:
        if "useAuthContext" not in page_content:
            page_blocks.append(('import { useAuthContext } from "@/providers/auth-provider";', "@/providers/auth-provider"))

    merged_blocks = merge_blocks(route_blocks, page_blocks)
    imports_text  = "\n".join(merged_blocks)

    # Route config
    route_config = extract_route_config(route_content)

    # Page function
    fn_start, fn_name = find_export_fn(page_lines)
    fn_lines, tail_lines = extract_fn_block(page_lines, fn_start)
    fn_text = transform_fn(fn_lines, fn_name, prop_type)

    # Fix tenant?. in tail helpers too
    if prop_type in ("tenant", "tenant+user"):
        tail_lines = [re.sub(r'\btenant\?\.([\w])', r'tenant.\1', l) for l in tail_lines]

    # Pre-fn content (interfaces, constants before the export function)
    last_imp = find_last_import_end(page_lines)
    pre_fn = get_pre_fn_content(page_lines, last_imp, fn_start)

    # Update Route config: route component → fn_name
    route_config = re.sub(r'component:\s*\w+', f'component: {fn_name}', route_config)

    # Assemble
    parts = [imports_text, ""]
    if pre_fn:
        parts += ["\n".join(pre_fn), ""]
    parts += [route_config, "", fn_text]

    tail_text = "\n".join(tail_lines).strip()
    if tail_text:
        parts += ["", tail_text]
    parts.append("")

    return "\n".join(parts), fn_name


# ─────────────────────────────────────────────────────────────────────────────
# Process routes that already use Route.useRouteContext() (ctx type)
# ─────────────────────────────────────────────────────────────────────────────

def process_ctx(route_path, page_path, _prop_type):
    """
    Route already has its own context wiring.
    Just inline the page function as a local helper (keep its props intact).
    """
    route_content = fread(route_path)
    page_content  = fread(page_path)
    page_lines    = page_content.splitlines()

    route_blocks = parse_import_blocks(route_content)
    route_blocks = filter_page_blocks(route_blocks)   # also strip @/pages/ from route
    page_blocks  = parse_import_blocks(page_content)
    page_blocks  = filter_page_blocks(page_blocks)

    merged_blocks = merge_blocks(route_blocks, page_blocks)
    imports_text  = "\n".join(merged_blocks)

    # Route body (everything after imports)
    route_body_lines = []
    past_imports = False
    in_import = False
    for line in route_content.splitlines():
        if re.match(r'^import\b', line):
            in_import = True
            continue
        if in_import:
            if re.search(r'from\s+"', line):
                in_import = False
            continue
        if not past_imports and not line.strip():
            continue
        past_imports = True
        route_body_lines.append(line)
    route_body = "\n".join(route_body_lines).strip()

    # Page function (keep props, just remove 'export')
    fn_start, fn_name = find_export_fn(page_lines)
    fn_lines, tail_lines = extract_fn_block(page_lines, fn_start)
    fn_text = "\n".join(fn_lines)
    fn_text = re.sub(r'^export (?:default )?', '', fn_text)

    last_imp = find_last_import_end(page_lines)
    pre_fn = get_pre_fn_content(page_lines, last_imp, fn_start)

    parts = [imports_text, ""]
    if pre_fn:
        parts += ["\n".join(pre_fn), ""]
    parts += [route_body, "", fn_text]
    tail_text = "\n".join(tail_lines).strip()
    if tail_text:
        parts += ["", tail_text]
    parts.append("")

    return "\n".join(parts), fn_name


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv
    errors  = []

    for route_path, page_path, prop_type in MAPPINGS:
        print(f"\nProcessing: {route_path}")
        print(f"  <- {page_path}  ({prop_type})")
        try:
            if prop_type == "ctx":
                new_content, fn_name = process_ctx(route_path, page_path, prop_type)
            else:
                new_content, fn_name = process_normal(route_path, page_path, prop_type)

            if dry_run:
                lines = new_content.splitlines()
                print(f"  [DRY] {len(new_content)} chars  component={fn_name}")
                for l in lines[:30]: print(f"    {l}")
                if len(lines) > 30: print("    ...")
            else:
                fwrite(route_path, new_content)
                fdel(page_path)
                print(f"  -> wrote {route_path}")
        except Exception as e:
            errors.append((route_path, str(e)))
            print(f"  ERROR: {e}")
            import traceback; traceback.print_exc()

    if errors:
        print(f"\n{len(errors)} error(s):")
        for p, e in errors: print(f"  {p}: {e}")
        sys.exit(1)
    else:
        print("\nAll done!")

if __name__ == "__main__":
    main()
