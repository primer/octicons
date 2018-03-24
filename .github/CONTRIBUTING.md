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

You can submit a pull request updating the `figma.url` configuration in the root [package.json](https://github.com/primer/octicons/blob/master/package.json#L10) with your figma file. Doing so will generate alpha releases of [all the libraries that distribute Octicons](https://github.com/primer/octicons#libraries).

Once the build passes on your pull request, you should see statuses with all the alpha versions of the libraries. You can then use these to test your changes.

[Here is an example pull request](https://github.com/primer/octicons/pull/206)

[<img src="https://user-images.githubusercontent.com/54012/37811102-45ec2abc-2e15-11e8-8c1d-2d162ddcdad2.png" width="700"/>](https://user-images.githubusercontent.com/54012/37811102-45ec2abc-2e15-11e8-8c1d-2d162ddcdad2.png)

---

# Maintainers accepting changes

Once submitted changes have been agreed upon, these instructions will guide core primer team members in merging in those changes.

## Step 1, Save:

Save the contributor’s figma file as a `.fig` file.

[<img src="https://user-images.githubusercontent.com/54012/37809888-940f5d38-2e0e-11e8-957f-99c162a1d4ff.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37809888-940f5d38-2e0e-11e8-957f-99c162a1d4ff.gif)

## Step 2, Import:

Drag and drop, or add the file to the main team project. Make sure its name is different from the master Octicons file.

[<img src="https://user-images.githubusercontent.com/54012/37809879-8d9824ee-2e0e-11e8-9b1d-e83316192eb0.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37809879-8d9824ee-2e0e-11e8-9b1d-e83316192eb0.gif)


## Step 3, Publish:

From the new imported file, publish the updated or new components to the team library. This published component makes importing into the master document easier.

[<img src="https://user-images.githubusercontent.com/54012/37807772-6734f926-2e04-11e8-98a0-9b4c73411bd3.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37807772-6734f926-2e04-11e8-98a0-9b4c73411bd3.gif)

## Step 4, Add:

In the Team Library you will see the new Octicons file, and all the components from that file. Add the new components to the master Octicons file. It makes changing easier if you drag it on top of the icon you are changing.

[<img src="https://user-images.githubusercontent.com/54012/37807775-6b1dea52-2e04-11e8-804a-a41c6bc04fd2.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37807775-6b1dea52-2e04-11e8-804a-a41c6bc04fd2.gif)

## Step 5, Replace:

Right click on the new component instance and select "Detach Instance". Then toggle both the old and new components open. Move the shape from the new component into the old component. Delete the old component’s shape. Delete the empty new component container.

[<img src="https://user-images.githubusercontent.com/54012/37807780-6ddba626-2e04-11e8-9a6b-749ac5b800fe.gif" width="400"/>](https://user-images.githubusercontent.com/54012/37807780-6ddba626-2e04-11e8-9a6b-749ac5b800fe.gif)

## Step 6, Publishing:

Publish the component changes to your team library. You can now delete the imported `.fig` file from the contributor.

[<img src="https://user-images.githubusercontent.com/54012/37812350-cc2349ba-2e1c-11e8-8b80-d9ff2f8d4ea3.png" width="600"/>](https://user-images.githubusercontent.com/54012/37812350-cc2349ba-2e1c-11e8-8b80-d9ff2f8d4ea3.png)

Create a release branch, and run `npm run bump`. This will guide you through a prompt asking what all the new versions of the packages should be. After, push up your branch and open a pull request into master.

[master-octicons]: https://www.figma.com/file/FP7lqd1V00LUaT5zvdklkkZr/Octicons
