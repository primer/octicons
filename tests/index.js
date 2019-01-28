import test from 'ava';
import fs from 'fs';

const octiconsLib = fs.readdirSync("./build/svg/");


test('No deprecated octicons are in ./build/data.json', t => {
  Object.keys(octicons).forEach( point => {
    t.truthy(octiconsLib.indexOf(point+'.svg') >= 0, './build/data.json contains the deleted octicon `' + point + '`, please remove it.' );
  })
})
