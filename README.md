# Octicons!

This is the [Bower][bower] package for [GitHub Octicons][octicons].

## Add Octicons to your project

1. Create a new file called *bower.json* (if you don't have one already).

2. Add a new line for the Octicon dependency, pointing to the correct repository:

  ``` json
  {
    "name": "my_great_project",
    "dependencies": {
      "octicons": "git@github.com:github/octicons.git"
    }
  }
  ```

3. Run `bower install`. The Octicons styles will be downloaded to *bower_components/octicons*.

4. Link to the `octicons.css` stylesheet in the `<head>` of your `<html>` page:

  ``` html
  <link rel="stylesheet" href="bower_components/octicons/octicons/octicons.css">
  ```

4. Simply use an icon in your HTML page:

  ``` html
  <span class="octicon octicon-microscope"></span>
  ```

### Rails' asset pipeline

Octicons includes a stylesheet specifically for [Rails 4/Sprockets][sprockets].

1. Create a new file called *vendor/assets/bower.json* (if you don't have one already).

2. Add a new line for the Octicon dependency, pointing to the correct repository:

  ``` json
  {
    "name": "my_great_project",
    "dependencies": {
      "octicons": "git@github.com:github/octicons.git"
    }
  }
  ```

3. `cd` into `ventor/assets` and run `bower install`. The Octicons styles will be downloaded to *vender/assets/bower_components/octicons*.

4. Open your config/application.rb, and add this line inside your Application:

  ``` ruby
  config.assets.precompile += %w(*.svg *.eot *.woff *.ttf)
  ```

5. In your application stylesheet, require `octicons`:

  ``` css
  /*
  = require octicons
  */
  ```

6. Simply use an icon in your HTML page:

  ``` html
  <span class="octicon octicon-flame"></span>
  ```

7. If you want a view helper, add something like this to *app/helpers/application_helper.rb*:

  ``` ruby
  def octicon(code)
    content_tag :span, '', :class => "octicon octicon-#{code.to_s.dasherize}"
  end
  ```

## Best practices

- Octicons look best in sizes that are multiples of 16px.

- Octicons are not monospaced. This lets them work well next to type, but it means they won’t stack nicely by default. If you intend to stack octicons, such as in navigation, you will want to add some CSS to make them the same width, and centered. For example:

  ``` css
  .navigation .octicon {
    width: 16px;
    text-align: center;
  }
  ```

## Versions

Octicons operates similarly to [Semver](http://semver.org/) with the following version convention:

- Major: Breaking changes — removed icons, markup changes, unicode switches, css renames, icon redesigns
- Minor: Non-breaking changes — new icons, new aliases, minor icon changes
- Patch: Unnoticable tweaks — slight visual changes, package updates


[octicons]: http://octicons.github.com
[bower]: http://bower.io/
[sprockets]: http://guides.rubyonrails.org/asset_pipeline.html
