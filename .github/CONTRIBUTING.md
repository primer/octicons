# Octicons Contribution Guidelines

Thank you for your interest in contributing to Octicons! We are currently only accepting submissions from GitHub staff and only include icons that are used in the GitHub UI.

## Adding or updating an icon

Follow these steps to add or update an icon.

### 1. Clone the repository

```shell
# Clone the repository
git clone https://github.com/primer/octicons

# Navigate to the newly cloned directory
cd octicons
```

If you don't have [`write`](https://help.github.com/en/github/getting-started-with-github/access-permissions-on-github) access to the [primer/octicons](https://github.com/primer/octicons) repository, instead of cloning the repository directly, you'll need to [fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:

```shell
# Clone your fork of the repository
git clone https://github.com/<your-username>/octicons

# Navigate to the newly cloned directory
cd octicons

# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/primer/octicons
```

### 2. Create a new feature branch

```shell
git checkout -b <branch-name>
```

### 3. Add or update SVG files in the `/icons` directory

### 4. Add or update keywords in `keywords.json`

```diff
{
  "mark-github": ["octocat", "brand", "github", "logo"],
+ "your-icon": ["foo", "bar"]
}
```

### 5. Commit and push changes

```shell
git add .
git commit -m <message>
git push
```

### 6. Create a pull request

Use GitHub to [create a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) for your branch. In your pull request description, be sure to mention where the icon will be used and any relevant timeline information.

If everything looks good, a maintainer will approve and merge the pull request when appropriate. After the pull request is merged, your icon will be available in the next Octicons release.

## Releasing changes

Once submitted changes have been agreed upon, these instructions will guide maintainers through releasing changes.

### 1. Create a release branch in the [primer/octicons](https://github.com/primer/octicons) repository.

```shell
git checkout -b release-x.y.z
```

In the context of Octicons, significant changes to the library or workflow, or removing an icon would be considered a major update. Adding a new icon would be considered a minor update. Fixing an icon would be considered a patch. Reach out in the #design-systems Slack channel if you're unsure.

### 2. Update the [CHANGELOG](https://github.com/primer/octicons/blob/master/CHANGELOG.md) describing the changes in this release.

### 3. Once the CHANGELOG has been updated, run `npm version <new-version>`.

This will update `package.json` with the new version, then update all the `lib/*` packages with the same version. If that runs smoothly, it should commit the changed files.

### 4. Push your branch and open a pull request into `master`.

A GitHub action will automatically publish a canary release of each Octicons package for each commit pushed to a branch. If the branch is prefixed with `release-` it will publish a release candidate.

### 5. Merge feature branches into the release branch

Merge any pull requests you want to include in the release into the release branch (e.g. `add-new-icon` → `release-1.2.3`).

### 6. Merge the release branch

Shortly after the release branch is merged into `master`, a GitHub action will publish new versions of each Octicons package.
