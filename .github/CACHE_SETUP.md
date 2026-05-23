# Build Cache Setup for CI/CD

This repository keeps CI caching intentionally small and tied to repo-pinned
tooling.

## What's Cached

- pnpm store via `actions/setup-node` with `cache: pnpm`
- Cache key dependency path: `pnpm-lock.yaml`

The workflows do not cache `node_modules`, `.next/static`, `.next/standalone`,
or generated TypeScript and lint outputs. Those paths are either reproducible
from the lockfile or can become stale across jobs.

## Shared Setup

Use the local composite action for Node.js and pnpm setup:

```yaml
- name: Setup Node.js and pnpm
  uses: ./.github/actions/setup-node-pnpm
```

The action reads:

- Node.js from `.nvmrc`
- pnpm from `package.json` `packageManager`
- dependencies from `pnpm-lock.yaml`

To skip installation:

```yaml
- name: Setup Node.js and pnpm
  uses: ./.github/actions/setup-node-pnpm
  with:
    install-command: ''
```

## Troubleshooting

- If dependency install behavior changes, update `pnpm-lock.yaml`.
- If the Node.js version changes, update `.nvmrc`.
- If the pnpm version changes, update `package.json` `packageManager`.
