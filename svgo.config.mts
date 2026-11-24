export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeStyleElement',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'xmlns:xlink',
          'id',
          'class',
          'data-name',
          '*:fill:(?!currentColor).*',
          'transform',
          'href',
          'clip-path',
          'clip-rule',
        ],
      },
    },
  ],
}
