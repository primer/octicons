/* eslint-disable import/no-commonjs,filenames/match-regex */

module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false
        }
      }
    },
    'removeStyleElement',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['xmlns:xlink', 'id', 'class', 'data-name', 'fill', 'transform', 'href', 'clip-path', 'clip-rule']
      }
    }
  ]
}
