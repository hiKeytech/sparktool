---
applyTo: '**/*.ts, **/*.tsx'
---

# Cleanup Instructions

- avoid using any type
- use proper types from the types folder
- properly handle timestamps as numbers and convert them to dates using libraries like dayjs or moment
- simplify data structures, avoid over-complicated mappings
- clean up imports, only import what is actually used
- remove unused interfaces and types
- fix variable naming, avoid using underscore prefixes for variables
- remove all fake/mock data and calculations
- remove fake IDs
- only use real API data
- use { zod4resolver } from "mantine-form-zod-resolver" for form validation instead of custom validation logic
- swap simple framer motion animations for AOS (Animate On Scroll) library for scroll-based animations
- AOS is already initialized in the main app component, just add data-aos attributes to elements
- ensure all components and pages are fully functional with real data
- use the DataTable component for displaying tabular data instead of custom table implementations
- ensure all modals and forms are connected to real API endpoints and handle responses correctly
- use the modals api from "@mantine/modals" for opening and managing modals
- don't use re-exports from index files, import directly from the source files. It is fine if the source file itself is an index file
