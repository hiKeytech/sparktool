---
applyTo: "**/*.ts,**/*.tsx"
description: A comprehensive guide to creating interfaces that blend **official Nigerian Government trust** with a **motivational, progressive** user experience.
---

# 🇳🇬 Design System Documentation: Nigerian Correctional Service

**Nigerian Correctional Service E-Learning Platform**

---

### **1. Core Philosophy: "Official Trust & Progressive Focus"**

Our design system is built to convey **trust, security, and a clear path toward progress** within the official framework of the Nigerian Correctional Service. The guiding principle is **"Clarity, Authority, and Achievement,"** using a clean, modern aesthetic rooted in the national colors.

#### **Key Tenets:**

- **Official Authority:** Visuals reinforce the platform's governmental ownership and security (Green, White, Green).
- **Motivation & Progression:** The design must clearly indicate where the user is and what they need to do next, fostering a sense of accomplishment.
- **Uncluttered Focus:** Content (especially videos) is prioritized. The interface must be distraction-free.
- **Accessibility & Simplicity:** The platform must be usable by all, regardless of technical background.

---

### **2. Color System: "Green, White, Green Authority"**

The color system is mandated by the Nigerian Government branding, prioritizing the official Green and White, with high-contrast supporting colors for action and data.

#### **Color Palettes & Usage**

- **Primary Authority (NCS Green):** The deep, dark green (e.g., `#006838` or a dark forest green variant like **fun-green-800**). Used for headers, primary buttons, high-impact progress indicators, and key branding elements.
- **Foundation Palette (White & Gray):** The workhorse of our design. **White** for main content backgrounds (cards, pages). **Gray (stone-50 to stone-200)** for secondary backgrounds, borders, and dividers.
- **Accent Palette (High-Vis Blue/Cyan):** Used sparingly (~10%) for high-impact elements like notification badges, focus rings, and secondary progress indicators where Green would be too heavy. (e.g., **cyan-500**).

- **Semantic Colors:**
  - **Success (Green):** fun-green-600, fun-green-800 (for completion)
  - **Caution/Warning (Amber):** amber-500
  - **Error (Red):** red-600 (A standard, clear error indicator)

#### **Usage Guidelines**

- **Green Saturation:** Use the dark primary Green heavily for top-level authority, and lighter shades (fun-green-500/600) for active states and success.
- **High Contrast:** Ensure all text passes WCAG contrast ratios, particularly against the Primary Green. Use `text-white` on `bg-fun-green-800`.
- **Text Color:** Prefer **stone-900** for body text.

---

### **3. Typography: "Clear & Direct"**

Our typography is clean, modern, and highly readable, prioritizing clarity over elaborate style.

#### **Font Families**

- **Headings & Body Text:** **font-sans** (e.g., Inter, system fonts). This ensures maximum readability across different screen types and accessibility standards.
- **Code/Data:** font-mono (for code snippets within lessons).

#### **Hierarchy & Best Practices**

- **Hierarchy:** Use bold weight, size, and the NCS Green (or stone-900) to establish a clear visual hierarchy.
- **Line Height:** Maintain a standard line height (`leading-normal` or `leading-relaxed`).
- **Reading Width:** Maintain a sensible content width (e.g., `max-w-prose` for long text blocks).

---

### **4. Surface & Card System: "Clear Elevation"**

Surfaces must be simple, elevated, and professional, mirroring the structure seen in the reference image. We prioritize a clean, shadow-based elevation system over complex visual effects.

#### **Core Implementation**

Cards and surfaces are clean white rectangles with subtle elevation.

- **Background:** Pure **white (`bg-white`)**.
- **Elevation:** A soft, clean shadow to lift the card off the gray background. (e.g., `shadow-lg` with a subtle gray color).
- **Border Radius:** Use **Mantine's default radius (`rounded-md` or `rounded-lg`)** for most elements. The **24px radius (`rounded-3xl`) is explicitly prohibited** as it does not fit the official aesthetic.
- **Borders:** Use **stone-200** for subtle borders around cards and inputs to define boundaries.

#### **Tailwind Equivalent (Card Surface)**

`bg-white rounded-lg border border-stone-200 shadow-sm`

#### **Border Radius Guidelines**

- **Standard Components (Inputs, Buttons):** Use `rounded-md` (Mantine default).
- **Card Surfaces & Containers:** Use `rounded-lg` (8px).
- **Prohibited:** **Do NOT use `rounded-3xl`**.

---

### **5. Interactivity & User Feedback**

Interactive elements must clearly utilize the NCS Green for primary actions and provide high-contrast feedback.

#### **Mantine Component Integration**

**CRITICAL:** Always use **Mantine components** for Buttons, Inputs, Selects, and Modals. Customize them using Tailwind utility classes or Mantine's theme overrides to apply the Green/White color scheme.

- **Use Built-in Variants:** Leverage Mantine's built-in variants, primarily `filled` for Primary and `subtle`/`light` for Secondary actions.

#### **Button Hierarchy & States**

- **Primary Button (Action/Go):** The most important call-to-action (e.g., "Continue Learning," "Enroll," "Mark as Complete").
  - Style: `bg-fun-green-800 text-white hover:bg-fun-green-700`
- **Secondary Button (Alternative):** For less critical, secondary actions (e.g., "Cancel," "View Details").
  - Style: `bg-stone-200 text-stone-700 hover:bg-stone-300`
- **Tertiary (Ghost) Button**: For de-emphasized actions (e.g., actions in the course sidebar).
  - Style: `text-stone-600 hover:bg-stone-50`

---

### **6. Focus States & Accessibility**

Clear focus states are mandatory for keyboard navigation, aligning with government accessibility standards.

- **Focus Style:** Use the `focus-visible` pseudo-class.
- **Implementation (ring utility)**: Use a high-visibility, professional color, like the Accent Blue/Cyan, for focus rings.
  `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-white`
- **Contrast:** Focus indicators must meet WCAG 2.1 AA standards.

---

### **7. Spacing & Layout System**

Use the 4px base unit from Tailwind/Mantine for spacing consistency.

- **Grid Philosophy:** Prefer structured, symmetrical layouts (e.g., two-column dashboards, clear sidebars) to reinforce the authoritative, structured nature of the platform.
- **Whitespace:** Use ample whitespace to delineate sections and prioritize content focus (especially videos).

---

### **8. Iconography: "Functional Minimalism"**

- **Style:** Prefer **filled** icons over outline to add weight and clarity.
- **Color:** Icons should typically use the **NCS Green (fun-green-800)** when indicating success, progress, or main features, or **stone-700** for navigation.

---

### **9. Animation & Motion: Framer & AOS**

Animations must be purposeful, adding value without distracting the user from the video lessons.

- **Framer Motion:** Use sparingly for showing **clear progression** (e.g., animating a progress bar, or a card entrance on the dashboard).
- **AOS:** Use for subtle entrance transitions on page load to give a polished feel.

---

### **10. Content Strategy: "Direct & Motivational"**

The tone must be professional, supportive, and action-oriented.

- **Voice & Tone:** **Direct, professional, and encouraging.** Use language that motivates and guides the student through the curriculum.
- **Terminology:** Use "Course," "Lesson," "Module," "Progress," and "Certificate."
- **Microcopy:** Button text must be highly action-oriented ("Start Quiz," "View Progress," "Continue Learning"). Error messages must be clear and offer a solution.

---

### **11. Accessibility & QA**

Accessibility is critical for inclusive government service delivery.

#### **Accessibility Checklist**

- [ ] All interactive elements meet minimum size requirements (44px touch target).
- [ ] Color is never the only way to convey information (e.g., use checkmarks/icons with progress bars).
- [ ] Focus indicators are high-contrast (focus-visible rings).
- [ ] Semantic HTML and proper ARIA labels are used (especially important when wrapping Mantine components).
