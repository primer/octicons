import test from 'ava';
import fs from 'fs';

const libs = fs.readdirSync("./lib/svg/");
const data = JSON.parse(fs.readFileSync("./lib/data.json"))

test('Octicons are loaded', t => {
  t.truthy(libs, "Didn't find any octicons.");
  t.not(Object.keys(libs).length, 0, "Didn't find any octicons.")
});

test('Octicons have keywords', t => {
  t.truthy(data, "Didn't find any octicons.");
  Object.keys(data).forEach( point => {
    t.truthy(data[point].keywords, 'The octicon "' + point + '" doesn\'t have any keywords')
    t.not(data[point].keywords.length, 0, 'The octicon "' + point + '" doesn\'t have any keywords')
  })
});

test('Every octicon is in ./lib/data.json', t => {
  libs.forEach( point => {
    point = point.replace('.svg', '')
    t.truthy(data[point], './lib/data.json doesn\'t include the octicon "' + point + '"')
  })
})

test('No deprecated octicons are in ./lib/data.json', t => {
  Object.keys(data).forEach( point => {
    t.truthy(libs.indexOf(point+'.svg') >= 0, './lib/data.json contains the deleted octicon `' + point + '`, please remove it.' );
  })
})
