# AGENTS.md

## Running tasks

- Prefer running repository tasks through Turborepo from the repository root, for example `npx turbo run build`.
- When targeting a specific workspace, use `--filter` with its package name, for example `npx turbo run build --filter=@primer/octicons-react`.

## Adding and reviewing octicons

- Follow the [add-octicon checklist](docs/add-octicon-checklist.md) when adding or reviewing octicons.
