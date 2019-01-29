import test from 'ava';
import fs from 'fs';

const octiconsLib = fs.readdirSync("./lib/build/svg");


test('SVG icons exist', t => {
  t.not(octiconsLib.length, 0, `We didn't find any svg files`)
})
