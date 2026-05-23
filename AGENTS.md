# BuiltByGervonte Codex Instructions

## Branch and PR workflow

For all Codex tasks from Linear:

- Follow the branch management guidance in `.github/BRANCH_MANAGEMENT.md`.
- Use `preview` as the base branch unless the Linear issue explicitly says otherwise.
- Never commit directly to `preview` or `main`.
- Create a feature branch from `preview`.
- Branch name format: `<linear-key>-<short-kebab-title>`.
  - Example: `bbg-41-align-ci-toolchain`
- Commit all task changes to the feature branch.
- Open a pull request targeting `preview`.
- Keep the PR scoped to the Linear issue only.
- Include the Linear issue key in the PR title or description.
- Summarize changed files and validation steps in the PR description.

## Commit messages

- Follow the commit message style shown in `.github/BRANCH_MANAGEMENT.md`.
- Use short conventional commit-style messages, such as `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, and `style:`.
- For documentation-only changes, use `docs:`.
- Keep commits focused on the Linear issue.

## Package manager and runtime

- Use `pnpm`.
- Use the Node version pinned in `.nvmrc`.
- Use the pnpm version pinned in `package.json`.

## Before finishing

Run relevant checks when possible:

- `pnpm run check`
- `pnpm run build:ci` when build or CI behavior may be affected

If a check cannot run, explain why in the final summary.

## Scope control

- Do not change deployment strategy, branch strategy, app behavior, or unrelated files unless the Linear issue explicitly asks for it.
- Prefer small, reviewable diffs.
- Do not introduce new dependencies unless necessary for the issue.
- Do not modify secrets or environment configuration unless explicitly requested.
