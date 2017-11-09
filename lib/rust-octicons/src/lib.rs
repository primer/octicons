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
    aria_hidden: Option<bool>,
    color: Option<&'static str>,
}

#[derive(Copy, Clone)]
pub enum OcticonKind {
    Polygon,
    Path,
}


impl Octicon {
    pub fn width<'a>(&'a mut self, width: usize) -> &'a mut Octicon {
        self.width = width;
        self
    }

    pub fn height<'a>(&'a mut self, height: usize) -> &'a mut Octicon {
        self.height = height;
        self
    }

    pub fn class<'a>(&'a mut self, class: Option<&'static str>) -> &'a mut Octicon {
        self.class = class;
        self
    }

    pub fn color<'a>(&'a mut self, color: Option<&'static str>) -> &'a mut Octicon {
        self.color = color;
        self
    }

    pub fn xmlns<'a>(&'a mut self, xmlns: Option<&'static str>) -> &'a mut Octicon {
        self.xmlns = xmlns;
        self
    }

    pub fn version<'a>(&'a mut self, version: Option<&'static str>) -> &'a mut Octicon {
        self.version = version;
        self
    }

    pub fn aria_label<'a>(&'a mut self, aria_label: Option<&'static str>) -> &'a mut Octicon {
        self.aria_label = aria_label;
        self
    }

    pub fn aria_hidden<'a>(&'a mut self, aria_hidden: Option<bool>) -> &'a mut Octicon {
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
            write!(f, "aria-label=\"{}\" role=img ", aria_label)?;

        } else {
            if let Some(true) = self.aria_hidden {
                write!(f, "aria-hidden=true ")?;
            }
        }
        if let Some(class) = self.class {
            write!(f, "class=\"{}\" ", class)?;
        }
        if let Some(color) = self.color {
            write!(f, "fill=\"{}\" ", color)?;
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
                    "<polygon fill-rule=evenodd points=\"{}\"></svg>",
                    self.data
                )
            }
            OcticonKind::Path => write!(f, "<path fill-rule=evenodd d=\"{}\"></svg>", self.data),
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
            aria_hidden: Some(true),
            color: None,
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
            aria_hidden: Some(true),
            color: None,
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
