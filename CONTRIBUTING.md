# Octicons Contribution Guidelines

Thank you for your interest in contributing to Octicons! We are currently only accepting submissions from GitHub staff and only include icons that are used in the GitHub UI.

## Icon request process

### 1. Icon request is made

- Icon requests are made using the [icon request template](https://github.com/github/primer/issues/new?assignees=ashygee&labels=octicon%2C+request&template=2-icon-request.md&title=%5BIcon+request%5D+) in the github/primer repo (visible to GitHub staff only).
- Once received, the issue will be placed in the **❓ Icon requests (inbox)** column of the [Octicons project board](https://github.com/orgs/github/projects/4503/views/11)
- Icons in the inbox will be triaged by a maintainer from the Octicons team. Maintainers should reply with a comment on the issue and then move the issue to the **💬 Responded** column of the Octicons [project board](https://github.com/orgs/github/projects/4503/views/11)

### 2. Assigning icons

- Each new icon request will initially be discussed async within our #octicons channel on Slack.
  - If the icon requires further discussion or needs more context before assigning, a maintainer will leave a comment on the issue requesting more information from the original requestor and the issue will be moved to the **⚠️ To discuss** column of the Octicons [project board](https://github.com/orgs/github/projects/4503/views/11)
  - If a currently existing icon can be used to clearly convey the correct metaphor, a suggestion will be made in the icon request issue and the issue will be moved to the **⚠️ To discuss** column of the Octicons [project board](https://github.com/orgs/github/projects/4503/views/11)
  - If it is decided that a new icon needs to be created the issue will be moved to the **📫 To do** column of the Octicons [project board](https://github.com/orgs/github/projects/4503/views/11)
- Icon requests will be assigned to a designer in the weekly Octicons sync held on Wednesdays
  - Once an icon has been assigned, it's up to assigned designer to be responsible for communicating the icon's status
  - Other designers are welcome to collaborate on any icons

### 3. Icon design, review, and communication

- Once design has been started on an icon, the request issue will be moved to the **✒️In Progress** column of the Octicons [project board](https://github.com/orgs/github/projects/4503/views/11)
- Designers should design the icon in Figma and when ready for review, use the [Octicons Push plugin](https://www.figma.com/community/plugin/825432045044458754/Octicons-Push) to create a PR
  - After a PR is created link to the PR in the icon request issue and move the issue to the **👁‍🗨 Ready for review** column of the Octicons [project board](https://github.com/orgs/github/projects/4503/views/11)
  - All review communication will be contained within the PR
  - PRs need approval from the icon requestor (stakeholder) and at least one designer on the octicons maintainer team

### 4. Icon request completed
- When an icon request PR has been approved by both the requestor and a member of Octicons maintainer team, the icon request is moved to the **🔼 Push to repo** column of the Octicons [project board](https://github.com/github/primer/projects/2)
- After a new release has been made, the new icons that were added will have their request issues moved to the **✔ Done** column


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

Releases are managed by 🦋 [Changesets](https://github.com/atlassian/changesets#documentation) which is a great tool for managing major/minor/patch bumps and changelogs. More info can be found in our [how we work docs](https://github.com/github/design-infrastructure/blob/main/how-we-work/engineering/changesets.md#using-changesets-to-prepare-and-publish-a-release).

We have the [changeset-bot comment on new pull requests](https://github.com/changesets/bot#readme) asking contributors or maintainers to add a changeset file, which will become the markdown supported changelog entry for the change.

When creating the changeset always commit into the working branch (pull request branch), not `main`.

When a pull request is approved merge it into the `main` branch. The changeset action will then create a Release pull request that includes this new pull request.

Once maintainers have agreed and are satisfied with the release. Merge the Release pull request. Changesets will then publish a new GitHub release to the repository with the changelog and new version number. A second action will be triggered by this release and publish the new versions to npm and rubygems.

🎉 Congratulations! The new release has been published.

## Other contributions

When contributing to Octicons outside of adding a new icon or release-dependent contribution, be sure to add the `skip-changeset` label to the pull request. This will allow for the pull request to skip the changeset check and have the ability to be merged into the main branch. 

Examples of other contributions include adding documentation or improving a GitHub Actions workflows.
