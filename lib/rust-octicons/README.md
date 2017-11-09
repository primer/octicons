# Octicons in Rust

This is a library that will let you easily include svg [octicons][octicons] in your rust server side templates.
The icons and their path data are exposed as static variables. Clone the statics and use the builder functions
to configure the icon's attributes.


## Install

1. Add this to your `Cargo.toml`

    ```toml
    octicons = "0.1"
    ```

2. Add the crate to your `main.rs` or `lib.rs`

    ```rust
    extern crate octicons;
    ```

3. Use the static structs in your server side templates

    ```rust
    format!("{}",
        octicons::ARROW_DOWN.clone()
            .xmlns(Some("http://www.w3.org/2000/svg"))
            .width(32)
            .height(32)
            .fill(Some("#ff0"))
            .aria_label(Some("hi"))
            .class(Some("right left"))
    );
    ```

## Documentation

Crate documentation can be found at [docs.rs/octicons/](https://docs.rs/octicons)


## Publishing

If you have access to publish this repository, these are the steps to publishing. If you need access, contact [#design-systems](https://github.slack.com/archives/design-systems).

**Before publishing** This package relies on the data from [octicons](https://github.com/primer/octicons). To update to the most recent version, you'll need to run `make prepare`

1. Update the [CHANGELOG.md](../../CHANGELOG.md) with relevant version number and any updates made to the repository.
2. Update the version in [Cargo.toml]() using the relevant version. The versioning is [semver](http://semver.org/), so version appropriately based on what has changed.
3. `cargo package --allow-dirty` Allow including the svg files needed by the build.rs
4. `cargo publish` This will build the crate and publish it to crate.io.
5. `git push && git push --tags` Push all these changes to origin.

## License

(c) 2012-2017 GitHub, Inc.

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).

_Font License:_ [SIL OFL 1.1](http://scripts.sil.org/OFL)  
Applies to all font files and SVG files

_Code License:_ [MIT](./LICENSE)  
Applies to all other files

[octicons]: https://github.com/primer/octicons
[octicons-docs]: https://octicons.github.com/
