# Repo Split Notes

Sparktool was split out of `hikey-learn/apps/sparktool` into this repository using git history rather than a filesystem copy.

## What Was Done

1. A subtree history was generated from `apps/sparktool`.
2. That history was cloned into this repository.
3. The existing app was moved into `apps/frontend` using git-aware renames.
4. A new `apps/backend` workspace was created for the dedicated backend service.
5. Tenant and platform config contracts were extracted into `packages/contracts`.
6. Tenant and platform config persistence/services were extracted into `packages/server-core`.

## Why The Extraction Is Staged

The existing Sparktool app is a TanStack Start application that mixes UI code and server-side logic in one app boundary.

Pulling the repository out first solves the history problem cleanly. After that, backend extraction can happen in smaller, safer steps:

1. move shared operational scripts and backend-only tooling into `apps/backend`
2. extract shared backend primitives into workspace packages
3. define the standalone backend runtime and API surface
4. migrate the remaining `apps/frontend/src/server` responsibilities into `apps/backend`
5. switch the frontend to consume that backend over an explicit API boundary

## Immediate Outcome

The repository is now structurally aligned with the intended monorepo shape without destroying Sparktool's commit history. The first backend extraction slice is also complete: tenant and platform config lookup no longer lives only inside the frontend workspace.
