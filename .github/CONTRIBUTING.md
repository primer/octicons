# Octicons Contribution Guidelines
Thank you for your interest in contributing to Octicons! We currently are only accepting submissions from GitHub staff and only include icons that are used in the GitHub UI.

## Adding or Updating icons

If you plan to update an icon and/or add a new icon follow these steps. These steps will be the same for core primer members and contributors.

Complete steps 1 - 3 and notify us of your changes, either with a pull request or an issue describing your changes. Screenshots welcome! 🎉

### Step 1, Duplicate:

The first step is to make a copy of the [master Octicons file][master-octicons] to your drafts folder. You can do this from the dropdown menu, select "Duplicate to your drafts".

[<img src="https://user-images.githubusercontent.com/54012/37802948-c10dca06-2de9-11e8-98c3-dd45cd561865.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37802948-c10dca06-2de9-11e8-98c3-dd45cd561865.gif)

### Step 2, Edit:

In your duplicate file, make proposed changes. In the example, we’ll make the GitHub logo red. It will also simplify things if you give your file a unique name e.g. _Octicons (Jon’s Changes)_.

[<img src="https://user-images.githubusercontent.com/54012/37803022-14d1a0fe-2dea-11e8-862d-b7ef22c918cf.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37803022-14d1a0fe-2dea-11e8-862d-b7ef22c918cf.gif)

## Step 3, Share:

Make sure your duplicate file can be viewed by others. In the share menu "Anyone with link" should be set to "can view". Copy the link.

[<img src="https://user-images.githubusercontent.com/54012/37803059-3ca54432-2dea-11e8-8c27-36c83a2dc5cb.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37803059-3ca54432-2dea-11e8-8c27-36c83a2dc5cb.gif)

### Step 4, Create a new icon submission issue

Create a new issue using the [Octicon submission](https://github.com/primer/octicons/issues/new?template=octicon-submission.md) template. Fill out the issue with screenshots of the icon(s), a link to the figma document, and remaining information.

The design systems team will review the submission and request any changes. If approved, your icon will be added to the next octicons release.


---

## Maintainers accepting changes

Once submitted changes have been agreed upon, these instructions will guide core primer team members in merging in those changes.

## Adding the icon

### 1. Paste into master figma file

If the icon is being updated, you'll need to keep the existing component and copy the new path into it.

### 2. Join any separate paths

Any separate shapes under the icon component need to be unioned into one path. This is for performance when serving the icons.

![image](https://user-images.githubusercontent.com/54012/72647901-7c9a7e80-392e-11ea-9e9b-08c4b8e1af0c.png)


### 3. Create and/or publish the icon as a figma component

Make sure you publish the icon changes to the figma component library. https://help.figma.com/hc/en-us/articles/360038665934

### 4. Add keywords to the icon

Each icon needs keywords to help build out the icon search. Add `keywords: foo, bar` to the "Component" section in the figma toolbar.

![image](https://user-images.githubusercontent.com/54012/72647771-26c5d680-392e-11ea-9167-462d5bb27936.png)


## Updating the release version

After you've published the latest changes in the Figma file, create a release branch in the [Octicons repo](https://github.com/primer/octicons).

Update the [CHANGELOG](https://github.com/primer/octicons/blob/master/CHANGELOG.md) with the new changes pertaining to this version.

Once the CHANGELOG has been updated, run `npm version <newversion>`. This will update package.json with the new version, then update all the `lib/*` packages with the same version. If that runs smoothly, it should commit the changed files. Push that commit to your release branch.

In the context of Octicons, significant changes to the library or workflow, or removing an icon would be considered a major update, adding a new icon would be considered a minor update, and fixing an icon would be considered a patch. Reach out in the #design-systems Slack channel if you're unsure!

After, push up your branch and open a pull request into master.

[master-octicons]: https://www.figma.com/file/FP7lqd1V00LUaT5zvdklkkZr/Octicons
