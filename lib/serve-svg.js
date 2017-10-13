const octicons = require('..')
const assign = require('object-assign')
const defaults = {
  fill: 'black',
}

module.exports = (req, res) => {
  const params = assign({}, defaults, req.params, req.query)
  const {icon} = params
  if (icon in octicons) {
    // console.warn('getting:', icon, octicons[icon].options)
    const svg = octicons[icon].toSVG(params)
    res.send(svg)
  } else {
    const keys = Object.keys(octicons)
    const rand = keys[~~(Math.random() * keys.length)]
    const qs = req.url.replace(/^[^\?]+/, '')
    res.status(404)
      .send(`No such icon: ${icon}. Try: <a href="/${rand}.svg${qs}">${rand}</a>`)
  }
}
