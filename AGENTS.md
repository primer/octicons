# AGENTS.md

## Running tasks

- Prefer running repository tasks through Turborepo from the repository root, for example `npx turbo run build`.
- When targeting a specific workspace, use `--filter` with its package name, for example `npx turbo run build --filter=@primer/octicons-react`.
- Exclude the local `.agents` directory from repository-wide tools and file scans.

## Verifying CI locally

- Use the Node.js version in `.nvmrc` and Ruby 3.3.
- Start from a clean dependency install. For dependency or lockfile changes, remove `node_modules` before regenerating `package-lock.json`; otherwise npm can omit optional dependencies for other platforms.
- Run the JavaScript lint and test checks:

  ```sh
  npm ci
  npx turbo run lint
  npx turbo run lint:npm
  npx playwright install chromium
  npx turbo run test
  ```

- Run the npm package check:

  ```sh
  npx turbo run build
  rm -rf packed
  mkdir packed
  npm pack \
    --workspace=@primer/octicons \
    --workspace=@primer/octicons-react \
    --workspace=@primer/styled-octicons \
    --pack-destination packed \
    --json
  ```

- Run the Ruby checks:

  ```sh
  bundle exec rake lint
  npx turbo run build --filter=//
  rm -rf lib/octicons_gem/lib/build
  cp -R lib/build lib/octicons_gem/lib/
  bundle exec rake test
  ```

- These commands can share the same `npm ci` when run together. Run them from the repository root and do not include `.agents` in repository-wide scans.

## Adding and reviewing octicons

- Follow the [add-octicon checklist](docs/add-octicon-checklist.md) when adding or reviewing octicons.
