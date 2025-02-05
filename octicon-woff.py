import os
import json
import defcon
from fontTools.ttLib import TTFont, newTable,getTableClass as gtc ,getTableModule as gtm,identifierToTag as idt
from fontTools.ttLib.tables.DefaultTable import DefaultTable
from fontTools.svgLib.path import SVGPath as svgPath
#from fontTools.ttLib.woff import WOFFFlavor
from svgpathtools import svg2paths
import math
def svg_to_glyph(svg_file, glyph_name,glyph_unicode):
    paths, attributes = svg2paths(svg_file)
    glyph_code = ''
    
    for path in paths:
        glyph_code += f'<path d="{path.d()}" />'
    #unicode = math.round(math.random() * 10000)
    return  f'<glyph glyph-name="{glyph_name}" unicode="{glyph_unicode}" d="{glyph_code}" />'

def create_woff_font(svg_files, output_woff, output_json):
    jsn = {};
    font = TTFont()
    CmapSubtable = gtm("cmap").CmapSubtable
    cmap4_0_3 = CmapSubtable.newSubtable(4)
    cmap4_0_3.platformID = 0
    cmap4_0_3.platEncID = 3
    cmap4_0_3.language = 0
    cmap4_0_3.cmap = {};
    unicode = 0x0E000
    for file in svg_files:
        handle = open(file,"r")
        print(file)
        name = str(file).split("/")[::-1][0].replace(".svg","")

        #print(file.split("/").reverse())

        svg = handle.read()
        unicode+=1
        glyph = defcon.Glyph()
        path = svgPath.fromstring(svg)
        path.draw(glyph.getPen())
        cmap4_0_3.cmap[unicode] = glyph
        jsn[unicode] = name
        handle.close()
    cmap = newTable("cmap");
    cmap.tableVersion = 0;
    cmap.tables = [cmap4_0_3]
    font.cmap = cmap
    font.flavor = "woff"
    font.save(output_woff + ".woff")
    font.flavor = "woff2"
    font.save(output_woff + ".woff2")
    #json.dump(jsn,json_file, indent=4)
    with open(output_json, 'w') as json_file:
       json.dump(jsn, json_file, indent=4)
def create_css(output_css,jsn):
    csstxt = ""
    csstxt += """
@font-face {\n
    font-display:block;
    font-family:\"octicons\";
    src: url(./fonts/octicon.woff2) format("woff2"),
    url(./fonts/octicon.woff) format("woff");
}\n"""
    csstxt += """.oi::before,
[class^="oi-"]::before,
[class*="oi-"]::before {
    display:inline-block;
    font-family: octicons !important;
    font-style: normal;
    font-weight: normal !important;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: -.125em;
    -webkit-font-smoothing: antiailiased;
    -mos-osx-font-smoothing: grayscale
}\n"""
    with open(output_json, "r") as jsn:
        m = jsn.read()
        jso = json.loads(m)
        for i in jso.items():
            csstxt += ".oi-"+str(i[1]) + "::before { content: \"\\f"+i[0] + "\"; }\n"
    handle = open(output_css,"w");handle.write(csstxt)
if __name__ == "__main__":
    svg_directory = './icons'
    output_woff = './css/octicon'
    output_json = './css/octicon-map.json'
    output_css = "./css/octicon.css"
    svg_files = [os.path.join(svg_directory, f) for f in os.listdir(svg_directory) if f.endswith('.svg')]
    create_woff_font(svg_files, output_woff, output_json)
    create_css(output_css,output_json)