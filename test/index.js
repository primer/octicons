import test from 'ava';
import octicons from '../';
import fs from 'fs';

const octiconsLib = fs.readdirSync("../lib/svg/");

test('octicon keywords and codepoints are loaded', t => {
  t.truthy(octicons, "Didn't find any octicons.");
  t.not(octicons.keywords.length, 0, "Didn't find any keywords.")
  t.not(octicons.codepoints.length, 0, "Didn't find any codepoints.")
});

octiconsLib.forEach( point => {
  point = point.replace('.svg', '');

  ['keywords', 'codepoints'].forEach( filename => {
    test(filename + '.json contains `' + point + '`', t => {
      t.truthy(octicons[filename][point], 'Can\'t find the `' + point + '` octicon in ' + filename + '.json');
    });
  });
});

['keywords', 'codepoints'].forEach( filename => {
  Object.keys(octicons[filename]).forEach( point => {
    test(filename + '.json has the valid octicon `' + point + '`', t => {
      t.truthy(octiconsLib.indexOf(point+'.svg') >= 0, filename + '.json contains the deleted octicon `' + point + '`, please remove it.' );
    });
  });
});
