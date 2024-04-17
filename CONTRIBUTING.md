# Octicons Contribution Guidelines

Thank you for your interest in contributing to Octicons! If you'd like to submit feedback, a bug, or an idea for improvement, please open a new issue in this repo using the appropriate [issue template](https://github.com/opf/openproject-octicons/issues/new/choose).

## Adding or updating an icon

Follow these steps to add or update an icon.

### 1. Clone the repository

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

### 2. Create a new feature branch

```shell
git checkout -b <branch-name>
```

### 3. Add or update SVG files in the `/icons` directory

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
For release dependent Pull Requests, add a changeset file to your Pull Request. These files are needed for the release process managed by [Changesets](https://github.com/changesets/changesets#readme).

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

Use GitHub to [create a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) for your branch. In your pull request description, be sure to mention where the icon will be used and any relevant timeline information.

If everything looks good, a maintainer will approve and merge the pull request when appropriate. After the pull request is merged, your icon will be available in the next Octicons release.


## Other contributions

When contributing to Octicons outside of adding a new icon or release-dependent contribution, you don't have to add a _Changeset_ file.  

Examples of other contributions include adding documentation or improving a GitHub Actions workflows.
