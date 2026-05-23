# BuiltByGervonte Codex Instructions

## Branch and PR workflow

For all Codex tasks from Linear:

- Follow the branch management guidance in `.github/BRANCH_MANAGEMENT.md`.
- Use `preview` as the base branch unless the Linear issue explicitly says otherwise.
- Never commit directly to `preview` or `main`.
- Create a feature branch from `preview`.
- Branch name format: `bbg-<number>-<short-kebab-title>`.
  - Convert the Linear key to lowercase for branch names: `BBG-42` becomes `bbg-42`.
  - Example: `bbg-41-align-ci-toolchain`
  - Codex Cloud may add a managed prefix such as `codex/linear-mention-`.
  - If Codex adds a managed prefix, the branch must still include the lowercase Linear key and open a PR targeting `preview`.
- Commit all task changes to the feature branch.
- Open a pull request targeting `preview`.
- Use the pull request template in `.github/pull_request_template.md`.
- Keep the PR scoped to the Linear issue only.
- Use the PR title format `type(LINEAR-KEY): brief description`.
  - Example: `docs(BBG-42): add Codex workflow instructions`
- Use the uppercase Linear key in PR text.
- Use `Closes LINEAR-KEY` in the PR Linear section.
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
