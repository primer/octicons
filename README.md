# Octicons

Oh, hi!

Octicons is a set of icons we use on GitHub. You can download directly from this repository, or include them in your project via bower or npm.

We use SVGs directly on GitHub, but we’ve also included an icon font and the requisite CSS if that’s how you roll, though it should be noted that font support is deprecated at this point. SVG is the future, and we should lean into it.

## Adding Octicons to your project using Bower

1. Create a new file called *bower.json* (if you don’t have one already).
2. Add a new line for the Octicon dependency, pointing to the correct repository:

``` json
{
  "name": "my_great_project",
  "dependencies": {
    "octicons": "*"
  }
}
```

3. Run `bower install`. The Octicons styles will be downloaded to *bower_components/octicons*.

### Adding Octicons via SVG

1. Link to the `octicons.min.css` in the `<head>` of your `<html>` page:

``` html
<link rel="stylesheet" href="bower_components/octicons/dist/svg/octicons.min.css">
```

2. Use an icon in your HTML page:

``` html
<img src='bower_components/octicons/dist/svg/sprite.octicons.svg#alert'>
```

### Adding Octicons via Icon Font

1. Link to the `octicons.min.css` stylesheet in the `<head>` of your `<html>` page:

``` html
<link rel="stylesheet" href="bower_components/octicons/dist/font/octicons.min.css">
```

2. Use an icon in your HTML page:

``` html
<span class="octicon octicon-alert"></span>
```

## Changing, adding, or deleting icons

1. Open the Sketch document in `/src/`. Each icon exists as an artboard within our master Sketch document. If you’re adding an icon, duplicate one of the artboards and add your shapes to it. Be sure to give your artboard name.
2. Once you’re happy with your icon set, choose File > Export…
3. Choose all the artboards you'd like to export and then press “Export”
4. Export to `/src/svg/`

You’ll next need to build your Octicons.

## Building Octicons

All the files you need will be in the `/dist/` directory already, but if you’ve made changes to the `/src/` directory and need to regenerate, follow these steps:

1. Open the Octicons directory in Terminal
2. Run the command `script/bootstrap`. This will install any necessary dependencies for generating the Octicons font and SVGs.
3. Run the command `grunt`. Running the grunt task will generate the font and SVGs, placing them in the `/dist/` directory.

## Best practices

- Octicons look best in sizes that are multiples of 16px. If using SVG, you can update the size using the `width` CSS property. For example:

``` css
.octicon {
  width: 32px;
}
```

- Octicons look best in sizes that are multiples of 16px. If using fonts, you can update the size using the `font-size` CSS property. For example:

``` css
.octicon {
  font-size: 32px;
}
```

- Octicons are not monospaced. This lets them work well next to type, but it means they won’t stack nicely by default. If you intend to stack Octicons, such as in navigation, you will want to add some CSS to make them the same width, and centered. For example:

``` css
.navigation .octicon {
  width: 16px;
  text-align: center;
}
```
