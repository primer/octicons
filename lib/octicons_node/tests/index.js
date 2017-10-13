import test from 'ava';
import octicons from '../';
import fs from 'fs';

const octiconsLib = fs.readdirSync("./build/svg/");

test('css got moved', t => {
  t.truthy(fs.existsSync("./build/build.css"), "build.css does not exist!");
});

test('Octicons are loaded', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  t.not(Object.keys(octicons).length, 0, "Didn't find any octicons.")
});

test('Octicons have keywords', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  Object.keys(octicons).forEach( point => {
    t.truthy(octicons[point].keywords, 'The octicon "' + point + '" doesn\'t have any keywords')
    t.not(octicons[point].keywords.length, 0, 'The octicon "' + point + '" doesn\'t have any keywords')
  })
});

test('Every octicon is in ./build/data.json', t => {
  octiconsLib.forEach( point => {
    point = point.replace('.svg', '')
    t.truthy(octicons[point], './build/data.json doesn\'t include the octicon "' + point + '"')
  })
})

test('No deprecated octicons are in ./build/data.json', t => {
  Object.keys(octicons).forEach( point => {
    t.truthy(octiconsLib.indexOf(point+'.svg') >= 0, './build/data.json contains the deleted octicon `' + point + '`, please remove it.' );
  })
})

test('Octicons have svg', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  Object.keys(octicons).forEach( point => {
    t.truthy(octicons[point].toSVG(), 'The octicon "' + point + '" doesn\'t have svg')
  })
});

test('Octicons have default html attributes', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  Object.keys(octicons).forEach( point => {
    var svg = octicons[point].toSVG()
    t.regex(svg, /version="1\.1"/, 'The octicon "' + point + '" doesn\'t have the version attribute')
    t.regex(svg, /aria\-hidden="true"/, 'The octicon "' + point + '" doesn\'t have the aria-hidden attribute')
    t.regex(svg, new RegExp("width=\"" + octicons[point].width + "\""), 'The octicon "' + point + '" doesn\'t have the width attribute')
    t.regex(svg, new RegExp("height=\"" + octicons[point].height + "\""), 'The octicon "' + point + '" doesn\'t have the height attribute')
    t.regex(svg, new RegExp("viewBox=\"0 0 " + octicons[point].width + " " + octicons[point].height + "\""), 'The octicon "' + point + '" doesn\'t have the viewBox attribute')
    t.regex(svg, new RegExp("class=\"octicon octicon-" + octicons[point].symbol + "\""), 'The octicon "' + point + '" doesn\'t have the class attribute')
  })
});

test('Passing in classnames will be included in output', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  Object.keys(octicons).forEach( point => {
    var svg = octicons[point].toSVG({ class: "new-class another-class" })
    t.regex(svg, new RegExp("class=\"octicon octicon-" + octicons[point].symbol + " new-class another-class\""), 'The octicon "' + point + '" doesn\'t have the class attribute')
  })
});

test('Passing in aria-label will update the a11y options', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  Object.keys(octicons).forEach( point => {
    var svg = octicons[point].toSVG({ "aria-label": "This is an icon" })
    t.regex(svg, new RegExp("aria\-label=\"This is an icon\""), 'The octicon "' + point + '" doesn\'t have the aria-label attribute')
  })
});

test('Passing in width will size properly', t => {
  var svg = octicons["x"].toSVG({ "height": 60 })
  t.regex(svg, new RegExp("width=\"45\""), 'The octicon "x" doesn\'t have the width attribute scaled properly')
});

test('Passing in height will size properly', t => {
  var svg = octicons["x"].toSVG({ "width": 45 })
  t.regex(svg, new RegExp("height=\"60\""), 'The octicon "x" doesn\'t have the height attribute scaled properly')
});
