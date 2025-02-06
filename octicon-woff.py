import os
import json
#import defcon
from fontTools.ttLib import TTFont, newTable,getTableClass as gtc ,getTableModule as gtm,identifierToTag as idt
from fontTools.ttLib.woff2 import compress as w2c
#from fontTools.ttLib.tables.DefaultTable import DefaultTable
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.svgLib.path import parse_path as parsePath, SVGPath
from font_converter import convert_font
#from fontTools.ttLib.woff import WOFFFlavor
from svgpathtools import svg2paths
#import math

def svg_to_glyph(svg_file, glyph_name,glyph_unicode):
    paths, attributes = svg2paths(svg_file)
    glyph_code = ''
    
    for path in paths:
        glyph_code += f'<path d="{path.d()}" />'
    #unicode = math.round(math.random() * 10000)
    #return  f'<glyph glyph-name="{glyph_name}" unicode="{glyph_unicode}" d="{glyph_code}" />'

def create_woff_font(svg_files, output_woff, output_json):
    jsn = {};
    font = TTFont()
    CmapSubtable = gtm("cmap").CmapSubtable
    Glyph = gtm("glyf").Glyph
    cmap4_0_3 = CmapSubtable.newSubtable(4)
    cmap4_0_3.platformID = 0
    cmap4_0_3.platEncID = 3
    cmap4_0_3.language = 0
    cmap4_0_3.cmap = {};
    font["glyf"] = newTable("glyf")
    head = font["head"] = newTable("head")
    #font["hhea"] = newTable("hhea")
    font["hmtx"] = newTable("hmtx")
    maxp = font["maxp"] = newTable("maxp")
    #font["name"] = newTable("name")
    #font["OS/2"] = newTable("OS/2")
    #font["post"] = newTable("post")
    font["glyf"].glyphs = {}
    font["hmtx"].metrics = {}
    unicode = 0x0E000
    numGlyphs = 0
    glyphOrder = []
    glyphSet = font.getGlyphSet()
    #print(dir(glyphSet))

    for file in svg_files:
        handle = open(file,"r")
        #print(file)
        paths = svg2paths(file)
        pen = SVGPathPen(None)
        name = str(file).split("/")[::-1][0].replace(".svg","")

        #print(file.split("/").reverse())
        
        svg = handle.read()
        unicode+=1
        glyph = Glyph()
        #print(dir(pen))
        #path = svgPath
        print(paths[0][0].d())
        parsePath(paths[0][0].d(),pen)
        
        glyph.draw(pen,font['glyf'].glyphs)
        glyph.components = []
        glyph.width = 16
        glyph.height = 16
       # print(dir(glyph))
        #ath = svgPath.fromstring(svg).d()
        #print(path)
        #path.draw(glyph.getPen())
        cmap4_0_3.cmap[unicode] = glyph
        #need to tie glyph to unicode
        
        
        font["glyf"].glyphs[unicode] = glyph
        print(font["glyf"].glyphs[unicode].components)
        font["hmtx"][unicode] = (glyph.width, 0)
        glyphOrder.append(unicode)
        jsn[unicode] = name
        handle.close()
        numGlyphs+=1
    maxp.numGlyphs = numGlyphs
    font["glyf"].setGlyphOrder(glyphOrder)
    #print(font["glyf"].glyphs[0x0E000 +1 ])
    cmap = newTable("cmap");
    #glyf = newTable("glypf");
    cmap.tableVersion = 0;
    cmap.tables = [cmap4_0_3]
    font.cmap = cmap
    head.tableVersion = 0
    head.fontRevision = 1.0
    head.checkSumAdjustment = 0
    head.magicNumber = 0x5F0F3CF5
    head.flags = 0x0003
    head.created = 0
    head.xMin = 0
    head.yMin = 0
    head.xMax = 16
    head.yMax = 16
    head.macStyle = 1
    head.lowestRecPPEM = 8
    head.fontDirectionHint = 2
    head.indexToLocFormat = 0
    head.glyphDataFormat = 0
    head.unitsPerEm = 1000

    head.compile(font)
    
    #font.glyf = glyph
    font.flavor = "woff"
    font.save(output_woff + ".woff")
    #font.flavor = "woff2"
    #hndle = open(output_woff+".woff","rb")
    convert_font(output_woff+".woff","./css/","woff2",lambda x: print(x),lambda x: print(x))
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
    handle = open(output_css,"w");
    handle.write(csstxt)
    handle.close()
if __name__ == "__main__":
    svg_directory = './icons'
    output_woff = './css/octicon'
    output_json = './css/octicon-map.json'
    output_css = "./css/octicon.css"
    svg_files = [os.path.join(svg_directory, f) for f in os.listdir(svg_directory) if f.endswith('.svg')]
    create_woff_font(svg_files, output_woff, output_json)
    create_css(output_css,output_json)