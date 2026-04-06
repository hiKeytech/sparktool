# Sparktool

Sparktool now lives in its own repository as a standalone monorepo.

This repository was created from the full git history of `apps/sparktool` in the `hikey-learn` repository, so the historical evolution of Sparktool is preserved here instead of being flattened into a one-time copy.

## Layout

- `apps/frontend`: the existing Sparktool TanStack Start application, moved with git-aware renames
- `apps/backend`: the new backend workspace for the API and operational scripts
- `packages/contracts`: shared tenant and platform configuration contracts
- `packages/server-core`: shared server-side tenant and platform config persistence/services
- `docs`: product and migration notes carried forward from the original app

## Current State

The repository shape is now ready for a proper frontend/backend split, but the extraction is intentionally staged:

- the current product still lives in `apps/frontend`
- the frontend still contains most TanStack Start server-side code under `apps/frontend/src/server`
- tenant and platform config resolution have been extracted into shared workspace packages
- `apps/backend` is the new destination for the dedicated backend service and now owns the operational seed scripts
- `apps/backend` now exposes basic read-only config endpoints backed by the shared server core

That means history is preserved first, structure is corrected second, and deeper code extraction can happen incrementally without losing provenance.

## Commands

From the repo root:

```bash
pnpm dev
pnpm build
pnpm typecheck
```

For tenant seeding during the extraction period:

```bash
pnpm --filter sparktool-backend seed:ncs
```
