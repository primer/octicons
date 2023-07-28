# Releasing changes

Releases are managed by 🦋 [_Changesets_](https://github.com/atlassian/changesets#documentation) which is a great tool for managing major/minor/patch bumps and changelogs.

We have the [changeset-bot comment on new pull requests](https://github.com/changesets/bot#readme) asking contributors or maintainers to add a changeset file, which will become the markdown supported changelog entry for the change.

When creating the changeset always commit into the working branch (pull request branch), not `main`.

When a pull request is approved merge it into the `main` branch. The changeset action will then create a Release pull request that includes this new pull request. This Release pull request will be updated automatically when new `.changeset` files are commited to the `main` branch. So **do not** override the Release pull request manually.

Once all changes are merged to `main`, you can also merge the Release pull request. _Changesets_ will then publish a new GitHub release to the repository with the changelog and new version number. A second action will be triggered by this release and publish the new versions to npm and rubygems.

🎉 Congratulations! The new release has been published.
