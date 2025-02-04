import os
import json
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables import otTables
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib.woff import main as woff_main
import xml.etree.ElementTree as ET

def svg_to_glyph(svg_path):
    tree = ET.parse(svg_path)
    root = tree.getroot()
    
    if root.tag != '{http://www.w3.org/2000/svg}svg':
        raise ValueError("The file is not a valid SVG")

    pen = TTGlyphPen(None)
    svg_pen = SVGPathPen(None)
    svg_pen.startPath()
    
    for element in root:
        if element.tag == '{http://www.w3.org/2000/svg}path':
            path_data = element.attrib['d']
            svg_pen.pathData(path_data)
    
    svg_pen.endPath()
    svg_pen.draw(pen)
    
    return pen.glyph()

def create_woff_from_svgs(svg_folder, output_woff, output_json):
    # Create a new font
    font = TTFont()
    font['head'] = otTables.head()
    font['hhea'] = otTables.hhea()
    font['maxp'] = otTables.maxp()
    font['OS/2'] = otTables.OS2()
    font['post'] = otTables.post()
    font['cmap'] = otTables.cmap()
    font['cmap'].tableVersion = 0
    font['cmap'].tables = []
    font['glyf'] = otTables.glyf()
    font['hmtx'] = otTables.hmtx()
    font['name'] = otTables.name()
    
    glyph_list = []
    unicode_id = 0xE000  # Starting Unicode ID for private use area
    
    # List all SVG files in the directory
    svg_files = [f for f in os.listdir(svg_folder) if f.endswith('.svg')]
    
    for i, svg_file in enumerate(svg_files):
        glyph_name = os.path.splitext(svg_file)[0]
        glyph = svg_to_glyph(os.path.join(svg_folder, svg_file))
        font['glyf'].glyphs[glyph_name] = glyph
        font['hmtx'].metrics[glyph_name] = (glyph.width, 0)
        
        # Add to cmap table
        cmap_table = otTables.cmap_format_4()
        cmap_table.format = 4
        cmap_table.language = 0
        cmap_table.platformID = 3
        cmap_table.platEncID = 1
        cmap_table.cmap = {unicode_id: glyph_name}
        font['cmap'].tables.append(cmap_table)
        
        # Add to glyph list
        glyph_list.append({glyph_name: unicode_id})
        unicode_id += 1
    
    # Generate the WOFF file
    font.save(output_woff)
    woff_main(['compress', output_woff])
    
    # Save the glyph list to a JSON file
    with open(output_json, 'w') as json_file:
        json.dump(glyph_list, json_file, indent=4)

# Example usage
svg_folder = '/path/to/your/svg/folder'
output_woff = '/path/to/output/file.woff'
output_json = '/path/to/output/file.json'
create_woff_from_svgs(svg_folder, output_woff, output_json)

print(f'WOFF file created at {output_woff}')
print(f'Glyph list JSON file created at {output_json}')