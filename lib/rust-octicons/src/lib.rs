//! All official GitHub Octicons available for use in your Rust code. Designed for use in Rust
//! server side templating code, such as **muad** templates. Each icon is available as a
//! named static instance of struct that implements Display. The path or polygon data for that
//! Octicon is also available as a static variable if you want to build your own svg elements.
//!
//! If you do not like the default configuration, clone the static variable and use builder
//! functions to customize it. The value and the presence of the svg attributes in the rendered
//! output can both be configured.
//!
//!
//!
//! ## Example
//!
//! ```
//! use octicons;
//!
//! println!("{}",
//!     octicons::ARROW_DOWN.clone()
//!         .xmlns(Some("http://www.w3.org/2000/svg"))
//!         .width(32)
//!         .height(32)
//!         .fill(Some("#ff0"))
//!         .aria_label(Some("hi"))
//!         .class(Some("right left"))
//! );
//!
//! // Path data
//! println!("{}", octicons::ARROW_DOWN_PATH);
//!
//! ```
//!
//! #### Maud Example
//!
//! ```no_run
//! # // dirty hack to show maud templates usage
//! # let x = "
//! html! {
//!     (PreEscaped(&octicons::DASH.to_string()))
//! }
//! # ";
//!
//! ```


/// Structure for Octicon configuration.
#[derive(Copy, Clone)]
pub struct Octicon {
    viewbox: &'static str,
    data: &'static str,
    kind: OcticonKind,
    // User configurable
    version: Option<&'static str>,
    xmlns: Option<&'static str>,
    class: Option<&'static str>,
    width: usize,
    height: usize,
    aria_label: Option<&'static str>,
    aria_hidden: bool,
    fill: Option<&'static str>,
}

#[derive(Copy, Clone)]
pub enum OcticonKind {
    Polygon,
    Path,
}


impl Octicon {
    /// Set the width attribute of the `<svg>` element. The height attribute will not be scaled
    /// automatically.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().width(32));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="32" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn width<'a>(&'a mut self, width: usize) -> &'a mut Octicon {
        self.width = width;
        self
    }

    /// Set the height attribute of the `<svg>` element. The width attribute will not be scaled
    /// automatically.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().height(48));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="48" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn height<'a>(&'a mut self, height: usize) -> &'a mut Octicon {
        self.height = height;
        self
    }

    /// Set the class attribute of the `<svg>` element. To prevent the attribute from being
    /// rendered, set it to `None`.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().class(None));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    ///
    /// let dash = format!("{}", DASH.clone().class(Some("left right")));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" class="left right" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn class<'a>(&'a mut self, class: Option<&'static str>) -> &'a mut Octicon {
        self.class = class;
        self
    }

    /// Set the fill attribute of the `<svg>`. To prevent the attribute from being rendered, set it
    /// to `None`.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().fill(None));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    ///
    /// let dash = format!("{}", DASH.clone().fill(Some("#ff0")));
    /// let expected = r##"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" fill="#ff0" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"##;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn fill<'a>(&'a mut self, fill: Option<&'static str>) -> &'a mut Octicon {
        self.fill = fill;
        self
    }

    /// Set the xmlns attribute of the `<svg>`. To prevent the attribute from being rendered, set it
    /// to `None`. NOTE: the xmlns attribute is required by some browsers if the svg is served
    /// alone. If the svg element will be part of an HTML document then you can omit the xmlns
    /// attribute.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().xmlns(None));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    ///
    /// let dash = format!("{}", DASH.clone().xmlns(Some("http://www.w3.org/2000/svg")));
    /// let expected = r##"<svg xmlns="http://www.w3.org/2000/svg" version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"##;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn xmlns<'a>(&'a mut self, xmlns: Option<&'static str>) -> &'a mut Octicon {
        self.xmlns = xmlns;
        self
    }

    /// Set the version attribute of the `<svg>`. To prevent the attribute from being rendered, set it
    /// to `None`.
    /// NOTE: the version attribute is apparently ignored by every user agent. If you want to save
    /// some bandwidth you are probably safe omitting it until the release of further major
    /// versions.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().version(None));
    /// let expected = r#"<svg aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    ///
    /// let dash = format!("{}", DASH.clone().version(Some("1.1")));
    /// let expected = r##"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"##;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn version<'a>(&'a mut self, version: Option<&'static str>) -> &'a mut Octicon {
        self.version = version;
        self
    }

    /// Set an aria-label on the `<svg>`. To prevent the attribute from being rendered, set it
    /// to `None`. If the aria-label is set, then the aria-hidden attribute is not rendered
    /// regardless of its value. Additionally the role attribute will be set to img.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().aria_label(None));
    /// let expected = r#"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    ///
    /// let dash = format!("{}", DASH.clone().aria_label(Some("dash")));
    /// let expected = r##"<svg version="1.1" aria-label="dash" role="img" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"##;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn aria_label<'a>(&'a mut self, aria_label: Option<&'static str>) -> &'a mut Octicon {
        self.aria_label = aria_label;
        self
    }

    /// Set an aria-hidden attribute on the `<svg>`. To prevent the attribute from being rendered, set it
    /// to false. If the aria-label is set, then the aria-hidden attribute is not rendered
    /// regardless of its value.
    ///
    /// ```
    /// # use octicons::DASH;
    /// let dash = format!("{}", DASH.clone().aria_hidden(false));
    /// let expected = r#"<svg version="1.1" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"#;
    /// assert_eq!(expected, dash);
    ///
    /// let dash = format!("{}", DASH.clone().aria_hidden(true));
    /// let expected = r##"<svg version="1.1" aria-hidden="true" class="octicon octicon-dash" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M0 7v2h8V7z"/></svg>"##;
    /// assert_eq!(expected, dash);
    /// ```
    pub fn aria_hidden<'a>(&'a mut self, aria_hidden: bool) -> &'a mut Octicon {
        self.aria_hidden = aria_hidden;
        self
    }
}

use std::fmt;

impl fmt::Display for Octicon {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "<svg ")?;
        if let Some(xmlns) = self.xmlns {
            write!(f, "xmlns=\"{}\" ", xmlns)?;
        }
        if let Some(version) = self.version {
            write!(f, "version=\"{}\" ", version)?;
        }
        if let Some(aria_label) = self.aria_label {
            write!(f, "aria-label=\"{}\" role=\"img\" ", aria_label)?;

        } else {
            if self.aria_hidden {
                write!(f, "aria-hidden=\"true\" ")?;
            }
        }
        if let Some(class) = self.class {
            write!(f, "class=\"{}\" ", class)?;
        }
        if let Some(fill) = self.fill {
            write!(f, "fill=\"{}\" ", fill)?;
        }
        write!(
            f,
            "width=\"{}\" height=\"{}\" viewBox=\"{}\">",
            self.width,
            self.height,
            self.viewbox
        )?;
        match self.kind {
            OcticonKind::Polygon => {
                write!(
                    f,
                    "<polygon fill-rule=\"evenodd\" points=\"{}\"/></svg>",
                    self.data
                )
            }
            OcticonKind::Path => {
                write!(f, "<path fill-rule=\"evenodd\" d=\"{}\"/></svg>", self.data)
            }
        }
    }
}

#[allow(unused_macros)]
macro_rules! generate_polygon_octicon {
    ($name:ident,
    $css_name:expr,
    $viewbox:expr,
    $width:expr,
    $height:expr,
    $points_name:ident => $points:expr
    ) => {
        pub static $points_name: &'static str = $points;
        pub static $name: Octicon = Octicon {
            viewbox: $viewbox,
            data: $points,
            kind: OcticonKind::Polygon,
            version: Some("1.1"),
            xmlns: None,
            class: Some(concat!("octicon octicon-", $css_name)),
            width: $width,
            height: $height,
            aria_label: None,
            aria_hidden: true,
            fill: None,
        };
    }
}

macro_rules! generate_path_octicon {
    ($name:ident,
    $css_name:expr,
    $viewbox:expr,
    $width:expr,
    $height:expr,
    $path_name:ident => $path:expr
    ) => {
        pub static $path_name: &'static str = $path;
        pub static $name: Octicon = Octicon {
            version: Some("1.1"),
            viewbox: $viewbox,
            data: $path,
            kind: OcticonKind::Path,
            xmlns: None,
            class: Some(concat!("octicon octicon-", $css_name)),
            width: $width,
            height: $height,
            aria_label: None,
            aria_hidden: true,
            fill: None,
        };
    }
}

include!(concat!(
    env!("OUT_DIR"),
    "/octicons_macro_instantiations.rs"
));


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        println!("{}", ARROW_DOWN);
        println!(
            "{}",
            ARROW_DOWN
                .clone()
                .xmlns(Some("http://www.w3.org/2000/svg"))
                .version(None)
        );
        println!(
            "{}",
            ARROW_DOWN.clone().xmlns(Some("http://www.w3.org/2000/svg"))
        );
    }
}
