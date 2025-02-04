import os
import json
from fontTools.ttLib import TTFont, newTable
from fontTools.ttLib.tables.DefaultTable import DefaultTable
from fontTools.ttLib.woff import WOFFFlavor
from svgpathtools import svg2paths

def svg_to_glyph(svg_file, glyph_name):
    paths, attributes = svg2paths(svg_file)
    glyph_code = ''
    
    for path in paths:
        glyph_code += f'<path d="{path.d()}" />'
        
    return f'<glyph glyph-name="{glyph_name}" unicode="&#x{ord(glyph_name):04X};" d="{glyph_code}" />'

def create_woff_font(svg_files, output_woff, output_json):
    font = TTFont()
    cmap = newTable('cmap')
    cmap.tableVersion = 0
    cmap.tables = []
    cmap_table = DefaultTable('cmap')
    cmap_table.format = 4
    cmap_table.language = 0
    cmap_table.platformID = 3
    cmap_table.platEncID = 1
    cmap_table.cmap = {}
    cmap.tables.append(cmap_table)
    
    glyf = newTable('glyf')
    glyf.glyphs = {}
    
    hmtx = newTable('hmtx')
    hmtx.metrics = {}
    
    maxp = newTable('maxp')
    maxp.tableVersion = 0x00010000
    maxp.numGlyphs = len(svg_files)
    
    head = newTable('head')
    head.tableVersion = 0x00010000
    head.fontRevision = 0x00010000
    head.checkSumAdjustment = 0
    head.magicNumber = 0x5F0F3CF5
    head.flags = 0
    head.unitsPerEm = 1000
    head.created = 0
    head.modified = 0
    head.xMin = 0
    head.yMin = 0
    head.xMax = 1000
    head.yMax = 1000
    head.macStyle = 0
    head.lowestRecPPEM = 0
    head.fontDirectionHint = 0
    head.indexToLocFormat = 0
    head.glyphDataFormat = 0
    
    hhea = newTable('hhea')
    hhea.tableVersion = 0x00010000
    hhea.ascent = 800
    hhea.descent = -200
    hhea.lineGap = 0
    hhea.advanceWidthMax = 1000
    hhea.minLeftSideBearing = 0
    hhea.minRightSideBearing = 0
    hhea.xMaxExtent = 1000
    hhea.caretSlopeRise = 1
    hhea.caretSlopeRun = 0
    hhea.caretOffset = 0
    hhea.reserved0 = 0
    hhea.reserved1 = 0
    hhea.reserved2 = 0
    hhea.reserved3 = 0
    hhea.metricDataFormat = 0
    hhea.numOfLongHorMetrics = len(svg_files)
    
    os2 = newTable('OS/2')
    os2.version = 0x0001
    os2.xAvgCharWidth = 500
    os2.usWeightClass = 400
    os2.usWidthClass = 5
    os2.fsType = 0
    os2.ySubscriptXSize = 0
    os2.ySubscriptYSize = 0
    os2.ySubscriptXOffset = 0
    os2.ySubscriptYOffset = 0
    os2.ySuperscriptXSize = 0
    os2.ySuperscriptYSize = 0
    os2.ySuperscriptXOffset = 0
    os2.ySuperscriptYOffset = 0
    os2.yStrikeoutSize = 0
    os2.yStrikeoutPosition = 0
    os2.sFamilyClass = 0
    os2.panose = b'\x00' * 10
    os2.ulUnicodeRange1 = 0
    os2.ulUnicodeRange2 = 0
    os2.ulUnicodeRange3 = 0
    os2.ulUnicodeRange4 = 0
    os2.achVendID = 'NONE'
    os2.fsSelection = 0
    os2.usFirstCharIndex = 0
    os2.usLastCharIndex = 0
    os2.sTypoAscender = 0
    os2.sTypoDescender = 0
    os2.sTypoLineGap = 0
    os2.usWinAscent = 0
    os2.usWinDescent = 0
    os2.ulCodePageRange1 = 0
    os2.ulCodePageRange2 = 0
    os2.sxHeight = 0
    os2.sCapHeight = 0
    os2.usDefaultChar = 0
    os2.usBreakChar = 0
    os2.usMaxContext = 0
    
    font['cmap'] = cmap
    font['glyf'] = glyf
    font['hmtx'] = hmtx
    font['maxp'] = maxp
    font['head'] = head
    font['hhea'] = hhea
    font['OS/2'] = os2
    
    svg_to_unicode = {}
    unicode_start = 0xE000
    for svg_file in svg_files:
        glyph_name = os.path.splitext(os.path.basename(svg_file))[0]
        unicode_code = unicode_start
        svg_to_unicode[glyph_name] = f'U+{unicode_code:04X}'
        unicode_start += 1
        
        glyph = svg_to_glyph(svg_file, glyph_name)
        glyph_table = DefaultTable(glyph_name)
        glyph_table.glyph = glyph
        glyf.glyphs[glyph_name] = glyph_table
        cmap_table.cmap[unicode_code] = glyph_name
        hmtx.metrics[glyph_name] = (1000, 0)
    
    font.flavor = WOFFFlavor()
    font.save(output_woff)
    
    with open(output_json, 'w') as json_file:
        json.dump(svg_to_unicode, json_file, indent=4)
    
if __name__ == "__main__":
    svg_directory = './icons/'
    output_woff = 'octicons.woff'
    output_json = 'octicon-map.json'
    svg_files = [os.path.join(svg_directory, f) for f in os.listdir(svg_directory) if f.endswith('.svg')]
    create_woff_font(svg_files, output_woff, output_json)
