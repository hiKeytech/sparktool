---
name: sparktool-landing-page
description: "Study, edit, or refine the SparkTool landing page. Use for landing page design reviews, hero copy updates, section rewrites, CTA changes, and deciding whether a change belongs in the frontend route or persisted platform config."
argument-hint: "Describe the landing page change, review goal, or section to update"
user-invocable: true
disable-model-invocation: false
---

# SparkTool Landing Page

Use this skill when working on the public SparkTool landing page in this repository.

This skill packages the current design and implementation pattern of the page so edits stay consistent with the existing visual system and content flow.

## What This Skill Covers

- Landing page copy changes
- Section-level layout or messaging updates
- Design review of the current landing page
- Determining whether content is route-owned or config-backed
- Updating persisted platform landing content after seed changes

## Primary Files

- Frontend route: `apps/frontend/src/routes/index.tsx`
- Platform landing seed: `apps/backend/scripts/seed-data/platform-config.json`

## Current Page Model

The landing page is split across two sources.

### Route-owned content

These live directly in `apps/frontend/src/routes/index.tsx` and should be edited there:

- Stats bar labels and displayed values
- The inline "Why SparkTool exists" section below the hero
- The "Built for Secure and Reliable Use" section heading and description
- The three-step workflow section heading and step text
- The "Simple System Setup" section heading
- The final CTA heading and button labels
- Hero-adjacent layout, section ordering, spacing, and animations

### Config-backed content

These come from persisted platform config and default to `apps/backend/scripts/seed-data/platform-config.json`:

- Hero eyebrow
- Hero title
- Hero description
- Hero primary and secondary CTA labels
- Highlight cards under the infrastructure section
- Login feature cards used in the setup section

If you update the seed file, the running app will only reflect those changes after the `platformConfig` document in MongoDB is updated.

## Design Characteristics To Preserve

- Dark, command-center hero with green-to-black gradient background
- Nigerian government trust tone: green, white, stone neutrals, restrained accent use
- Mantine buttons with Tailwind utility styling
- High-contrast typography and uppercase utility labels
- AOS-driven section reveals instead of heavy motion systems
- Clear split between narrative sections and data-backed cards
- Structured, authority-first layout rather than playful marketing patterns

## Procedure

1. Start from the landing route.

Read `apps/frontend/src/routes/index.tsx` first to identify the exact section being changed and whether the request affects structure, static copy, or data-backed copy.

2. Classify the requested change.

Use this decision rule:

- If the change affects section headings, inline explanatory blocks, stats labels, or footer CTA copy, edit the route.
- If the change affects the hero marketing fields, highlight cards, or setup feature cards, edit `apps/backend/scripts/seed-data/platform-config.json`.
- If the change affects both, update both surfaces in the same pass.

3. Keep the existing design language intact.

Do not flatten the page into a generic SaaS layout. Preserve the current visual rhythm:

- dense hero
- restrained white card sections
- bold uppercase micro-labels
- green trust cues
- clear CTA hierarchy

4. Make minimal edits.

Prefer copy and content changes over structural rewrites unless the request explicitly asks for a redesign.

5. Validate immediately after the first edit.

Use a narrow check first:

- `get_errors` on the touched route or config file
- If content comes from config, verify whether the app reads from persisted Mongo data

6. Push config-backed updates to MongoDB when needed.

If the landing page content is stored in the database, upsert the `platformConfig` document after changing the seed file. A minimal one-off update is preferred over rerunning broad seed workflows.

7. Confirm the result in user terms.

Report:

- which sections changed
- whether the update was route-only or config-backed
- whether MongoDB was updated
- any required refresh or restart step

## Quality Checks

Before closing the task, confirm all of the following:

- Copy matches the requested wording and section order
- Route-owned content was not incorrectly moved into config
- Config-backed content was not hardcoded into the route
- The page still matches the repo's green, white, and stone visual system
- Touched files have no local errors
- If config changed, the database state was updated or the user was told it still needs to be updated

## Common Pitfalls

- Editing only the seed file and expecting the running app to update automatically
- Hardcoding hero or card copy in the route when it is sourced from `platformConfig`
- Reworking the layout more than needed for simple content requests
- Losing the institutional tone by switching to generic startup-style messaging

## Example Prompts

- `/sparktool-landing-page update the hero and stats bar copy`
- `/sparktool-landing-page review the landing page for consistency with the current design`
- `/sparktool-landing-page change the feature cards and push the new copy to MongoDB`
- `/sparktool-landing-page tell me which landing page text lives in code vs platform config`
