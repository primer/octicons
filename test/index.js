import test from 'ava';
import octicons from '../';
import fs from 'fs';

const octiconsLib = fs.readdirSync("../lib/svg/");

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

test('Every octicon is in ./lib/data.json', t => {
  octiconsLib.forEach( point => {
    point = point.replace('.svg', '')
    t.truthy(octicons[point], './lib/data.json doesn\'t include the octicon "' + point + '"')
  })
})

test('No deprecated octicons are in ./lib/data.json', t => {
  Object.keys(octicons).forEach( point => {
    t.truthy(octiconsLib.indexOf(point+'.svg') >= 0, './lib/data.json contains the deleted octicon `' + point + '`, please remove it.' );
  })
})
