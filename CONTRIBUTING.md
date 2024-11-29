# Octicons Contribution Guidelines (Currently GitHub Staff only)

Thank you for your interest in contributing to Octicons! We are currently only accepting submissions from GitHub staff and only include icons that are used in the GitHub UI. If you'd like to submit feedback, a bug, or an idea for improvement, please open a new issue in this repo using the appropriate [issue template](https://github.com/primer/octicons/issues/new/choose).

## Icon request and review process

### 1. Icon review request is made

- Icon review requests are made using the [icon request template](https://github.com/github/primer/issues/new?assignees=&labels=octicon%2C+request%2C+needs+triage&template=02-icon-request.md&title=%5BIcon+request%5D+) in the github/primer repo (visible to GitHub staff only).
- Icons in the Primer Roadmap inbox will be triaged by a maintainer from the Octicons team. Maintainers should reply with a comment on the issue and then move the issue to Primer Teams Backlog.

### 2. Working on icons

- If an icon recommendation can be made async, we will discuss it in #primer-octicons or directly in the issue.
- Icon review requests require a working session, we will send an invitation. 
  - Once an icon has been assigned, it's up to assigned designer to be responsible for communicating the icon's status and drive the work forward.

### 3. Icon design, review, and communication

- Once design has been started on an icon, the request issue will be moved to the **Design in Progress** column of the Primer Teams Backlog.
- Designers should design the icon in Figma and when ready for review, use the [Octicons Push plugin](https://www.figma.com/community/plugin/825432045044458754/Octicons-Push) to create a PR
  - After a PR is created link to the PR in the icon request issue. PRs need approval from the icon requestor (stakeholder) and at least one designer on the octicons maintainer team.

### 4. Icon request completed
- When an icon request PR has been approved, communicate that in the issue.
- After the Octicons release, the new icons that were added will have their request issues moved to the **Done** column


## Adding or updating an icon

Follow these steps to add or update an icon.

### Manually with SVG files

#### 1. Clone the repository

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

#### 2. Create a new feature branch

```shell
git checkout -b <branch-name>
```

#### 3. Add or update SVG files in the `/icons` directory

#### 4. Add or update keywords in `keywords.json`

```diff
{
  "mark-github": ["octocat", "brand", "github", "logo"],
+ "your-icon": ["foo", "bar"]
}
```

#### 5. Commit and push changes

```shell
git add .
git commit -m <message>
git push
```

#### 6. Create a pull request

Use GitHub to [create a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) for your branch. In your pull request description, be sure to mention where the icon will be used and any relevant timeline information.

If everything looks good, a maintainer will approve and merge the pull request when appropriate. After the pull request is merged, your icon will be available in the next Octicons release.

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

When contributing to Octicons outside of adding a new icon or release-dependent contribution, be sure to add the `skip-changeset` label to the pull request. This will allow for the pull request to skip the changeset check and have the ability to be merged into the main branch. 

Examples of other contributions include adding documentation or improving a GitHub Actions workflows.
