# Branch Management Guide

This guide explains how to properly manage branches to prevent commit accumulation and maintain clean deployment history.

## 🎯 Branch Strategy

### **Main Branches**

- **`main`**: Production branch, auto-deploys to production
- **`preview`**: Integration branch, auto-creates PRs to main

### **Feature Branches**

- **`bbg-123-short-description`**: Standard Linear issue branches
- **`codex/linear-mention-bbg-123-short-description`**: Codex Cloud-managed Linear issue branches
- **`feature/short-description`**: Manual development branches when there is no Linear issue
- **`bugfix/short-description`**: Manual bug fix branches when there is no Linear issue
- **`hotfix/short-description`**: Critical fixes when there is no Linear issue

For Linear issues, use the Linear issue key at the start of the branch name. Branch names must be lowercase, so convert `BBG-42` to `bbg-42`:

- **`bbg-42-add-agentsmd-codex-workflow-instructions`**
- **`bbg-41-align-ci-toolchain`**

Codex Cloud may create branches with a managed prefix, such as `codex/linear-mention-bbg-41-align-ci-toolchain`. These are acceptable when they still include the lowercase Linear key and open a PR targeting `preview`.

## 🚀 Workflow Process

### **1. Starting New Work**

```bash
# Always start from clean preview branch
git checkout preview
git pull origin preview
git checkout -b bbg-123-add-hover-effects
```

### **2. Development Process**

```bash
# Make commits with clear messages
git add .
git commit -m "feat: add hover effects to buttons"
git commit -m "fix: resolve tooltip positioning"
git commit -m "style: improve mobile responsiveness"
```

### **3. Creating Pull Request**

```bash
# Push feature branch
git push origin bbg-123-add-hover-effects

# Create PR: bbg-123-add-hover-effects → preview
# Use the PR template with proper description
```

### **4. After PR Merge**

```bash
# Delete local feature branch
git checkout preview
git pull origin preview
git branch -d bbg-123-add-hover-effects

# Delete remote feature branch
git push origin --delete bbg-123-add-hover-effects
```

## 🧹 Preventing Commit Accumulation

### **What Causes the Problem**

- ❌ Merging feature branches without squashing
- ❌ Not cleaning up preview branch after deployments
- ❌ Creating merge commits instead of fast-forward merges
- ❌ Not deleting old feature branches

### **How to Prevent It**

#### **1. Always Use Squash Merges**

When merging PRs, use "Squash and merge" to:

- Combine all commits into one clean commit
- Remove merge commits
- Keep history clean

#### **2. Regular Preview Branch Cleanup**

The automated cleanup workflow will:

- Reset preview branch to match main after each deployment
- Remove all accumulated merge commits
- Keep preview branch clean for new features

#### **3. Feature Branch Best Practices**

```bash
# Good: Clean feature branch
bbg-123-add-hover-effects
├── feat: add hover effects to buttons
├── fix: resolve tooltip positioning
└── style: improve mobile responsiveness

# Bad: Messy feature branch
bbg-123-add-hover-effects
├── WIP: working on hover effects
├── fix: typo
├── fix: another typo
├── Merge branch 'main' into bbg-123-add-hover-effects
├── fix: resolve conflicts
└── feat: add hover effects to buttons
```

## 🔧 Manual Cleanup (If Needed)

### **Reset Preview Branch**

```bash
# If preview branch gets messy
git checkout preview
git reset --hard origin/main
git push origin preview --force
```

### **Clean Up Feature Branches**

```bash
# Delete merged feature branches
git branch --merged | grep -v main | grep -v preview | xargs -n 1 git branch -d

# Delete remote branches
git remote prune origin
```

## 📋 Checklist for Each Feature

- [ ] Create feature branch from clean preview
- [ ] Use the lowercase Linear issue key in the branch name when work maps to Linear (`BBG-42` → `bbg-42`)
- [ ] Make focused, atomic commits
- [ ] Use clear commit messages
- [ ] Create PR to preview (not main)
- [ ] Use squash merge when merging
- [ ] Delete feature branch after merge
- [ ] Verify preview branch stays clean

## 🚨 Warning Signs

Watch out for these signs that indicate branch management issues:

- Preview branch has many merge commits
- Auto-deploy PRs show 20+ commits
- Feature branches have "Merge branch 'main'" commits
- Old feature branches still exist after merging
- Preview branch is behind main

## 🛠️ Automated Solutions

The repository includes automated workflows to prevent these issues:

1. **Auto-Deploy Workflow**: Creates clean PRs from preview to main
2. **Cleanup Workflow**: Resets preview branch after successful merge
3. **Squash Merge**: Automatically squashes commits when merging

## 📚 Additional Resources

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Git Squash and Merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits)
- [Git Branch Management](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)

---

**Remember**: Clean branches = Clean deployments = Happy developers! 🎉
