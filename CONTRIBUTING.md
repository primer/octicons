# Octicons Contribution Guidelines

Thank you for your interest in contributing to Octicons! If you'd like to submit feedback, a bug, or an idea for improvement, please open a new issue in this repo using the appropriate [issue template](https://github.com/opf/openproject-octicons/issues/new/choose).

## Adding or updating an icon

Follow these steps to add or update an icon.

### Manually with SVG files

#### 1. Clone the repository

```shell
# Clone the repository
git clone https://github.com/opf/openproject-octicons

# Navigate to the newly cloned directory
cd openproject-octicons
```

If you don't have [`write`](https://help.github.com/en/github/getting-started-with-github/access-permissions-on-github) access to the [opf/openproject-octicons](https://github.com/opf/openproject-octicons) repository, instead of cloning the repository directly, you'll need to [fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:

```shell
# Clone your fork of the repository
git clone https://github.com/<your-username>/openproject-octicons

# Navigate to the newly cloned directory
cd openproject-octicons

# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/opf/openproject-octicons
```

#### 2. Create a new feature branch

```shell
git checkout -b <branch-name>
```

#### 3. Add or update SVG files in the `/icons` directory

Be sure to add SVG files with the correct naming (suffix `-16` required,
suffixes `-12` and `-24` are optional). Check for the correct viewBox
inside the SVG, but do not bother with `fill`, `fill-rule`, or `clip-rule`
attributes, as those are removed by the CI step "Optimize SVGs".

### 4. Add or update keywords in `keywords.json`

```diff
{
  "mark-github": ["octocat", "brand", "github", "logo"],
+ "your-icon": ["foo", "bar"]
}
```

### 5. Create and push a changeset
For release dependent Pull Requests, add a changeset file to your Pull Request. These files are needed for the release
process managed by [Changesets](https://github.com/changesets/changesets#readme).

1. Install (if you have not done before)
    ```shell
    npm install @changesets/cli && npx changeset init
    ```
2. Create a changeset
    ```shell
    npx changeset
    ```
3. Select version type (patch, minor, major)
4. Type a message explaining your changes (equivalent to release notes)

### 6. Commit and push changes

```shell
git add .
git commit -m <message>
git push
```

### 7. Create a pull request

Use GitHub to [create a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) for your branch. In your pull request description, be sure to mention where
the icon will be used and any relevant timeline information.

If everything looks good, a maintainer will approve and merge the pull request when appropriate. After the pull request
is merged, your icon will be available in the next Octicons release.

### Using the Octicons Push Figma plugin

If you work at GitHub, you can use the [Octicons Push](https://www.figma.com/community/plugin/825432045044458754/Octicons-Push) Figma plugin to start an Octicons pull request from Figma.

Here's how it works:

1. Select the icon frames you want to commit. Make sure the frames are either 16x16 or 24x24 and that you've outlined all strokes.
2. Open the Octicons Push plugin.
3. Select the branch you want to commit to. You can choose an existing branch or create a new branch.
4. Press "Commit." The plugin will then export, commit, and push the selected icons to the branch you chose. If you chose to create a new branch, the plugin will give you a link to where you can start a new pull request with your branch.

After you create a pull request, a member of the Design Infrastructure team will triage and review your contribution.

![demo showing how to create a pull request using the Octicons Push Figma plugin](https://user-images.githubusercontent.com/4608155/77948730-b1a24600-727a-11ea-9c39-040be9a12963.gif)

## How changes are reviewed

Here are a few questions we'll ask when reviewing new octicons. Keep these in mind as you're designing:

- Where will this icon be used in the context of GitHub UI?
- Is an icon necessary in that context?
- Could we use an existing icon?
- Is the icon trying to represent too many ideas?
- Does it follow the design guidelines?

## Releasing changes

Once submitted changes have been agreed upon, these instructions will guide maintainers through releasing changes.

Releases are managed by 🦋 [Changesets](https://github.com/atlassian/changesets#documentation) which is a great tool for managing major/minor/patch bumps and changelogs. More info can be found in our [how we work docs](https://github.com/github/design-infrastructure/blob/main/how-we-work/engineering/changesets.md#using-changesets-to-prepare-and-publish-a-release).

We have the [changeset-bot comment on new pull requests](https://github.com/changesets/bot#readme) asking contributors or maintainers to add a changeset file, which will become the markdown supported changelog entry for the change.

When creating the changeset always commit into the working branch (pull request branch), not `main`.

When a pull request is approved merge it into the `main` branch. The changeset action will then create a Release pull request that includes this new pull request.

Once maintainers have agreed and are satisfied with the release. Merge the Release pull request. Changesets will then publish a new GitHub release to the repository with the changelog and new version number. A second action will be triggered by this release and publish the new versions to npm and rubygems.

🎉 Congratulations! The new release has been published.

## Other contributions

When contributing to Octicons outside of adding a new icon or release-dependent contribution, you don't have to add a
_Changeset_ file.

Examples of other contributions include adding documentation or improving a GitHub Actions workflows.
