---
applyTo: "**"
description: This document provides technical standards and best practices to ensure consistency, maintainability, and optimal user experience (especially regarding security and performance) for the **Nigerian Correctional Service** e-learning platform.
---

# 🇳🇬 Nigerian Correctional Service E-Learning Platform Technical Guidelines

---

## 🏛️ Overview & Project Context

This manual outlines the technical standards and best practices for building the secure, internal, government-owned **Nigerian Correctional Service** e-learning platform. These guidelines ensure consistency, security, maintainability, and optimal user experience (UX) for both students and administrative staff, leveraging the mandated technology stack.

## 1. Styling & Design Standards

### Primary: Mantine & Tailwind CSS

- **Mantine:** Use the **Mantine component library** for all base UI elements (Buttons, Inputs, Cards, Layouts, Tables, Modals, Notifications). This ensures rapid development and built-in accessibility.
- **Tailwind CSS:** Use Tailwind utility classes primarily for:
  - **Customizing Mantine components** (overriding defaults).
  - Implementing the **Green, White, Green** color palette (especially the deep NCS green).
  - Handling complex layout adjustments and responsive design.
  - Applying utility-first styling where Mantine's built-in styles are insufficient.

### Motion & Transitions

- **AOS (Animate On Scroll):** Use for subtle, tasteful transitions of large content blocks (like Cards) upon initial view or scrolling, enhancing the professional feel.
- **Framer Motion:** Reserve for high-value micro-interactions, complex UI choreography, or custom entrance/exit animations (e.g., certificate presentation, progress bar completion).

---

## 2. State Management

### Global Asynchronous State: TanStack Query

- **Use Cases:** All server-side data fetching, caching, synchronization, and updates (e.g., getting the course list, fetching an students's progress, submitting a quiz score).
- **Query Keys:** **Strictly use `ibnlanre/builder`** to generate and manage all TanStack Query keys. This enforces consistency and simplifies cache invalidation.

### Global Synchronous State: ibnlanre/portal

- **Use Cases:** Simple global state not tied to API calls, such as UI themes, language settings, admin side-panel visibility, or simple user session data (once authenticated).

### Form State: Mantine Form

- **Standard Practice:** Use **`@mantine/form`** for all forms across the Admin and Student portals to manage form values, validation state, and submission handling consistently.

---

## 3. Input & Schema Validation

### Primary: Zod

- **Standard Practice:** Use **Zod** for defining all validation schemas.
- **Integration:** Integrate Zod with Mantine Form to provide seamless, user-friendly validation and feedback messages.
- **Schema Organization:** Create reusable validation schemas in dedicated `/schemas` or `/types` directories for clean separation of concerns.

---

## 4. Data Storage & Retrieval Strategy

### Primary: Server-Side API & TanStack Query

- Given the sensitive nature (government/correctional data), the primary source of truth for all data must be the **secure backend API** managed via **TanStack Query**.

### Client-Side Storage Solutions

- **`localStorage`:** Only for non-sensitive user preferences (e.g., light/dark mode preference, UI settings). **Never store Student IDs or progress data here.**
- **Vimeo:** All video content will be hosted securely on Vimeo and embedded into the platform. Ensure the use of secure embedding methods (e.g., private video settings, domain-level privacy).
- **Offline Data (Avoid unless necessary):** Avoid using IndexedDB/Dexie unless a strict project requirement is established for offline access, as this adds complexity to security and synchronization.

---

## 5. Project Structure

The structure emphasizes clear separation of roles, a government mandate for security, and component reusability.

```
/src
  /api              // API client and query key logic
    - api-client.ts
    /keys           // ibnlanre/builder configuration
      - course-keys.ts
      - students-keys.ts
  /components
    /shared         // Reusable across Admin and Student
      /ui           // Mantine wrappers, custom inputs
      /layout       // Header, Sidebar, Footer components
    /admin          // Components specific to Admin Dashboard
    /students         // Components specific to Student Portal
  /features         // Large, domain-specific logic (e.g., Course module)
    /course
      - course-watch.tsx
      - course-sidebar.tsx
    /user-management
      - student-table.tsx
      - user-details-modal.tsx
  /hooks
    - use-auth.ts
    - use-progress-tracker.ts
  /pages
    /auth
      - login.tsx
      - signup.tsx
    /admin          // Admin-specific routes
      - dashboard.tsx
      - users.tsx
      - course-management.tsx
    /students         // Student-specific routes
      - dashboard.tsx
      - catalog.tsx
      - progress.tsx
  /styles
    - tailwind.css
  /types
    - user.ts
    - course.ts
    - api.ts
  /utils
    - validators.ts
    - helpers.ts
```

### I. Shared / Public Pages

These are the entry points to the platform, accessible to anyone before they log in.

1.  **Login Page:** The secure "front door" for both students and admins. The system will check their role upon login and redirect them to the correct dashboard.
2.  **Forgot Password Page:** A standard page to allow users to securely reset their password (this may be an admin-only function, depending on your security rules).

---

### II. Student (Student) Portal

This is the entire experience for the student user, focused on learning, progression, and motivation.

3.  **Student Dashboard (Home):** The first page after login. Shows a welcome message, a "My Learning Path" progress card, "Current Courses," and "Announcements." (We designed this).
4.  **Course Catalog:** A grid or list of all available courses (e.g., "Product Management," "React for Beginners") that the student can browse and enroll in. (We designed this).
5.  **Course Details Page:** A "preview" page an student sees _before_ enrolling. It shows the full course syllabus/curriculum, a detailed description, the instructor, and an "Enroll Now" button.
6.  **Course Watch Page:** The main learning environment. This page features the Vimeo video player, a sidebar with all course modules/lessons (so they can track progress), a "Mark as Complete" button, and tabs for "Description" or "Q&A." (We designed this).
7.  **Quiz / Assessment Page:** A dedicated page or modal for taking a quiz or submitting an assignment. This is crucial for testing knowledge.
8.  **"My Progress" / Achievements Page:** The student's "trophy room." This page is vital for motivation, showing all completed courses, downloadable certificates, and earned badges. (We designed this).
9.  **User Profile / Settings Page:** A simple page where the student can view their profile details and, most importantly, change their password.

---

### III. Admin Portal

This is the "mission control" for NCS staff, focused on management, monitoring, and content.

10. **Admin Dashboard (Home):** The admin's landing page. It shows high-level, aggregate data: "Total Active Students," "Certificates Issued," "Most Popular Courses," and a "Recent Activity" feed. (We designed this).
11. **User Management Page (List):** A powerful table view of all students on the platform. It must be searchable, sortable, and filterable (e.g., "Show all students in the 'Software Engineering' path"). (We designed this).
12. **Student Details Page (Admin View):** This is the **core monitoring page**. When an admin clicks an student's name from the list, they see a detailed profile:
    - The student's personal information.
    - A list of all their enrolled courses.
    - A detailed progress bar for _each_ course.
    - Their quiz scores and activity logs.
13. **Create User Page (Sign Up):** A secure form **for admins only** to manually create a new student account (Full Name, Student ID, assign a learning path, set a temporary password). (We designed the _cleaner_ version of this).
14. **Course Management Page (List):** A table for admins to see all courses on the platform. They can edit, delete, or unpublish courses from here.
15. **Create/Edit Course Page:** A large, multi-step form for admins to build a course. This is where they would:
    - Add the course title, description, and thumbnail.
    - Build the curriculum (e.g., "Module 1," "Lesson 1.1").
    - Add the **Vimeo video link** for each lesson.
    - Create quizzes using a quiz-builder tool.
16. **Announcements Management Page:** A simple CMS for admins to create, edit, and publish the announcements that appear on the Student Dashboard.

This list of 16 pages covers the full, end-to-end user journeys for both your students and the monitoring staff.

---

## 7. Development Workflow, Quality & Security

### Key Security & Context Requirements

- **User Role Verification:** All routes must be protected using **React Router** to check the user's role (Student or Admin) and redirect unauthorized access.
- **Vimeo Security:** Ensure video playback uses private/secure links, potentially using signed URLs or private embed settings to prevent unauthorized content access.
- **Data Minimization:** Only store the minimum necessary user data. Given the environment, extra scrutiny is required for any PII.

### Testing Strategy: Vitest & Playwright

- **Unit & Integration (Vitest):** Test all utility functions, custom hooks, and complex component logic. **Must include tests for the `ibnlanre/builder` query key files.**
- **E2E (Playwright):** Validate the complete **Student Learning Path** (Login -\> Enroll -\> Watch Video -\> Mark Complete -\> Check Progress) and the **Admin Monitoring Path** (Login -\> View User List -\> Check Progress Details).

### Code Quality & Standards

- **TypeScript:** Strictly enforce proper typing. Minimize use of `any` and leverage TypeScript's features for strong type safety across the application, especially for data returned by TanStack Query.
- **File Naming:** Continue to use **kebab-case** for all files and folders.
- **Accessibility (A11y):** Given this is a government service, **strict adherence to A11y standards is mandatory**. Ensure Mantine components are used correctly and custom elements have proper ARIA attributes, keyboard navigation, and color contrast (especially with the dominant Green color).
