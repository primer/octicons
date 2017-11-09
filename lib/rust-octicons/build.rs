extern crate svgparser;
#[macro_use]
extern crate quote;

use std::env;
use std::path::Path;
use std::fs;
use std::io::{Read, Write};
use svgparser::{Tokenize, ElementId, AttributeId, svg};

enum OcticonKind {
    Polygon,
    Path,
}

fn main() {
    let out_dir = env::var("OUT_DIR").unwrap();
    let project_root = util::find_project_root(Path::new("./")).unwrap();


    let mut octicons_impl = String::new();

    let data_dir = project_root.as_path().join("build/svg/");
    println!("data_dir = {:?}", data_dir);
    assert!(data_dir.is_dir());
    for entry in fs::read_dir(data_dir).unwrap() {
        let entry = entry.unwrap();
        let file_path = entry.path().to_path_buf();

        let octicon_name = match file_path.as_path().file_stem() {
            Some(os_str) => os_str.to_str().unwrap().to_string(),
            None => panic!(),
        };
        //let octicon_name = file_stem.to_str().unwrap().to_string();

        if file_path.is_file() {
            let mut buffer = String::new();
            {
                let mut file = fs::File::open(file_path).unwrap();
                file.read_to_string(&mut buffer).unwrap();
            }


            // Data we are looking for
            let mut width: Option<usize> = None;
            let mut height: Option<usize> = None;
            let mut kind: Option<OcticonKind> = None;
            let mut data: Option<String> = None;
            let mut view_box: Option<String> = None;
            // We expect format <svg><path/></svg> or <svg><polygon/></svg>
            let mut p = svg::Tokenizer::from_str(&buffer).tokens();

            for token in &mut p {
                match token {
                    svg::Token::SvgElementStart(ElementId::Svg) => {}
                    svg::Token::SvgElementStart(ElementId::Path) => {
                        kind = Some(OcticonKind::Path);
                    }
                    svg::Token::SvgElementStart(ElementId::Polygon) => {
                        kind = Some(OcticonKind::Polygon);
                    }
                    svg::Token::SvgElementStart(tag_id) => {
                        panic!(
                            "Unexpected svg element <{:?}> found in {:?}",
                            tag_id,
                            entry.path()
                        );
                    }
                    svg::Token::SvgAttribute(aid, value) => {
                        match (aid, &kind) {
                            (AttributeId::D, &Some(OcticonKind::Path)) |
                            (AttributeId::Points, &Some(OcticonKind::Polygon)) => {
                                data = Some(value.slice().to_string())
                            }
                            (AttributeId::Width, _) => {
                                width = Some(value.slice().parse::<usize>().unwrap());
                            }
                            (AttributeId::Height, _) => {
                                height = Some(value.slice().parse::<usize>().unwrap());
                            }
                            (AttributeId::ViewBox, _) => {
                                view_box = Some(value.slice().to_string());
                            }
                            _ => {
                                // ignore the attribute
                            }
                        }

                    }
                    _ => {}
                }

            }
            p.error().unwrap();

            let width = width.expect("width attribute");
            let height = height.expect("height attribute");
            let data = data.expect("points or d");
            let view_box = view_box.expect("viewBox attribute");

            let ident_name: String = octicon_name.replace('-', "_").to_uppercase();

            let octicon_macro_impl: quote::Tokens = match kind.expect("path or polygon") {
                OcticonKind::Path => {
                    let path_static_ident: quote::Ident =
                        quote::Ident::from(format!("{}_PATH", ident_name));
                    let static_oction_ident: quote::Ident = quote::Ident::from(ident_name);
                    quote! {
                        generate_path_octicon!(
                            #static_oction_ident,
                            #octicon_name,
                            #view_box,
                            #width,
                            #height,
                            #path_static_ident => #data
                        );
                    }
                }
                OcticonKind::Polygon => {
                    let points_static_ident = quote::Ident::from(format!("{}_PATH", ident_name));
                    let static_oction_ident = quote::Ident::from(ident_name);
                    quote! {
                        generate_polygon_octicon!(
                            #static_oction_ident,
                            #octicon_name,
                            #view_box,
                            #width,
                            #height,
                            #points_static_ident => #data,
                        );
                    }
                }
            };
            octicons_impl.push_str(octicon_macro_impl.as_ref());
        }
    }
    // Generate the macro impl file
    let mut file = fs::File::create(Path::new(&out_dir).join("octicons_macro_instantiations.rs"))
        .unwrap();
    file.write_all(octicons_impl.to_string().as_bytes())
        .unwrap();

}

mod util {
    use std::fs::{metadata, canonicalize};
    use std::path::{Path, PathBuf};
    use std::io::{self, ErrorKind, Error};

    /// Look for the cargo.toml file that we are building to determine the root directory of the
    /// project (so that we can locate the source files)
    pub fn find_project_root(search: &Path) -> io::Result<PathBuf> {
        if !search.is_dir() {
            return Err(Error::new(
                ErrorKind::InvalidInput,
                format!("`{:?}` is not a directory", search),
            ));
        }
        let mut path_buf = canonicalize(search)?;

        let error: io::Error = Error::new(
            ErrorKind::NotFound,
            format!(
                "could not find `Cargo.toml` in `{:?}` or any parent directory",
                path_buf
            ),
        );

        loop {
            let test_file = path_buf.as_path().join("Cargo.toml");
            match metadata(test_file) {
                Ok(_) => return Ok(path_buf),
                Err(_) => (),
            }
            match path_buf.as_path().parent() {
                Some(_) => (),
                None => return Err(error),
            }
            path_buf.pop();
        }
    }
}
