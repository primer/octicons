# Adding or Updating icons

If you plan to update an icon and/or add a new icon follow these steps. These steps will be the same for core primer members and contributors.

Complete steps 1 - 3 and notify us of your changes, either with a pull request or an issue describing your changes. Screenshots welcome! 🎉

## Step 1, Duplicate:

The first step is to make a copy of the [master Octicons file][master-octicons] to your drafts folder. You can do this from the dropdown menu, select "Duplicate to your drafts".

[<img src="https://user-images.githubusercontent.com/54012/37802948-c10dca06-2de9-11e8-98c3-dd45cd561865.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37802948-c10dca06-2de9-11e8-98c3-dd45cd561865.gif)

## Step 2, Edit:

In your duplicate file, make proposed changes. In the example, we’ll make the GitHub logo red. It will also simplify things if you give your file a unique name e.g. _Octicons (Jon’s Changes)_.

[<img src="https://user-images.githubusercontent.com/54012/37803022-14d1a0fe-2dea-11e8-862d-b7ef22c918cf.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37803022-14d1a0fe-2dea-11e8-862d-b7ef22c918cf.gif)

## Step 3, Share:

Make sure your duplicate file can be viewed by others. In the share menu "Anyone with link" should be set to "can view". Copy the link.

[<img src="https://user-images.githubusercontent.com/54012/37803059-3ca54432-2dea-11e8-8c27-36c83a2dc5cb.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37803059-3ca54432-2dea-11e8-8c27-36c83a2dc5cb.gif)

## Step 4, Pull Request: _(Optional)_

You can submit a pull request updating the `FIGMA_FILE_URL` configuration in the .github/[main.workflow](https://github.com/primer/octicons/blob/master/.github/main.workflow?short_path=dd94174#L41) with your Figma file. Doing so will generate alpha releases of [all the libraries that distribute Octicons](https://github.com/primer/octicons#libraries).

If an icon was edited or added, you should see the before and after images directly in the PR. In addition, please describe your proposed changes in the PR's description.

Once the build passes on your pull request, you should see statuses with all the alpha versions of the libraries. You can then use these to test your changes.

[Here is an example pull request](https://github.com/primer/octicons/pull/206)

[<img src="https://user-images.githubusercontent.com/54012/37811102-45ec2abc-2e15-11e8-8c1d-2d162ddcdad2.png" width="700"/>](https://user-images.githubusercontent.com/54012/37811102-45ec2abc-2e15-11e8-8c1d-2d162ddcdad2.png)

---

# Maintainers accepting changes

Once submitted changes have been agreed upon, these instructions will guide core primer team members in merging in those changes.

## Step 1, Save:

Save the contributor’s Figma file as a `.fig` file and open in Figma (it will automatically be imported into your Drafts)


## Step 2, Import:

Drag and drop, or paste the updated or new icon from the contributer's file into the main Octicons Figma file. Make sure that the SVG only contains a single `path` and that it has relevant component keywords in Figma.


## Step 3, Add:

Once the new changes have been added the new components to the master Octicons file, you can publish to the team library in Figma.


## Step 4, Create a Release Branch in Octicons:

After you've published the latest changes in the Figma file, create a release branch in the [Octicons repo](https://github.com/primer/octicons).

Update the [CHANGELOG](https://github.com/primer/octicons/blob/master/CHANGELOG.md) with the new changes pertaining to this version.

Once the CHANGELOG has been updated, run `npm version <newversion>`. This will update package.json with the new version, then update all the `lib/*` packages with the same version. If that runs smoothly, it should commit the changed files. Push that commit to your release branch.

In the context of Octicons, significant changes to the library or workflow, or removing an icon would be considered a major update, adding a new icon would be considered a minor update, and fixing an icon would be considered a patch. Reach out in the #design-systems Slack channel if you're unsure!

After, push up your branch and open a pull request into master.

[master-octicons]: https://www.figma.com/file/FP7lqd1V00LUaT5zvdklkkZr/Octicons
