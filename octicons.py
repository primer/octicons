import os
import json
from fontTools.ttLib import TTFont, newTable
from fontTools.pens.ttGlyphPen import TTGlyphPen
import xml.etree.ElementTree as ET

def svg_to_glyph(svg_path):
    tree = ET.parse(svg_path)
    root = tree.getroot()
    
    if root.tag != '{http://www.w3.org/2000/svg}svg':
        raise ValueError("The file is not a valid SVG")

    pen = TTGlyphPen(None)
    for element in root:
        if element.tag == '{http://www.w3.org/2000/svg}path':
            path_data = element.attrib['d']
            pen.moveTo((0, 0))
            pen.qCurveTo(*parse_path_data(path_data))
            pen.closePath()
    
    glyph = pen.glyph()
    glyph.width = 1000  # Set a standard width for all glyphs
    return glyph

def parse_path_data(path_data):
    # This function should parse path data correctly.
    # For simplicity, this is a placeholder. You might need a proper SVG path parser.
    return [(0, 0), (100, 100)]

def create_woff_from_svgs(svg_folder, output_woff, output_json):
    # Create a new font
    font = TTFont()
    font['head'] = newTable('head')
    font['hhea'] = newTable('hhea')
    font['maxp'] = newTable('maxp')
    font['OS/2'] = newTable('OS/2')
    font['post'] = newTable('post')
    font['cmap'] = newTable('cmap')
    font['cmap'].tableVersion = 0
    font['cmap'].tables = []
    font['glyf'] = newTable('glyf')
    font['hmtx'] = newTable('hmtx')
    font['name'] = newTable('name')

    glyph_list = []
    unicode_id = 0xE000  # Starting Unicode ID for private use area

    # List all SVG files in the directory
    svg_files = [f for f in os.listdir(svg_folder) if f.endswith('.svg')]

    cmap_subtable = newTable('cmap')
    cmap_subtable.format = 4
    cmap_subtable.platformID = 3
    cmap_subtable.platEncID = 1
    cmap_subtable.language = 0
    cmap_subtable.cmap = {}

    for svg_file in svg_files:
        glyph_name = os.path.splitext(svg_file)[0]
        glyph = svg_to_glyph(os.path.join(svg_folder, svg_file))
        font['glyf'].glyphs[glyph_name] = glyph
        font['hmtx'].metrics[glyph_name] = (glyph.width, 0)

        # Add to cmap subtable
        cmap_subtable.cmap[unicode_id] = glyph_name

        # Add to glyph list
        glyph_list.append({glyph_name: unicode_id})
        unicode_id += 1

    font['cmap'].tables.append(cmap_subtable)
    
    # Generate the WOFF file
    font.flavor = 'woff'
    font.save(output_woff)

    # Save the glyph list to a JSON file
    with open(output_json, 'w') as json_file:
        json.dump(glyph_list, json_file, indent=4)

# Example usage
svg_folder = './icons/'
output_woff = './octicons.woff'
output_json = './octicons.json'
create_woff_from_svgs(svg_folder, output_woff, output_json)

print(f'WOFF file created at {output_woff}')
print(f'Glyph list JSON file created at {output_json}')