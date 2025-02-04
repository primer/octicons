import os
import json
from fontTools.ttLib import TTFont, newTable
from fontTools.ttLib.tables.DefaultTable import DefaultTable
#from fontTools.ttLib.woff import WOFFFlavor
from svgpathtools import svg2paths
import math
def svg_to_glyph(svg_file, glyph_name,glyph_uinicode):
    paths, attributes = svg2paths(svg_file)
    glyph_code = ''
    
    for path in paths:
        glyph_code += f'<path d="{path.d()}" />'
    #unicode = math.round(math.random() * 10000)
    return  f'<glyph glyph-name="{glyph_name}" unicode="{glyph_unicode}" d="{glyph_code}" />'

def create_woff_font(svg_files, output_woff, output_json):
    font = TTFont()
    cmap = newTable('cmap')
    
    font.flavor("woff")
    font.save(output_woff)
    
    with open(output_json, 'w') as json_file:
        json.dump(svg_to_unicode, json_file, indent=4)
    
if __name__ == "__main__":
    svg_directory = './icons/'
    output_woff = 'octicons.woff'
    output_json = 'octicon-map.json'
    svg_files = [os.path.join(svg_directory, f) for f in os.listdir(svg_directory) if f.endswith('.svg')]
    create_woff_font(svg_files, output_woff, output_json)
