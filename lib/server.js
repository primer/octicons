const sharp = require('sharp')
const express = require('express')
const app = express()

const octicons = require('..')
const assign = require('object-assign')
const defaults = {
  fill: 'black',
}

const iconRenderer = render => {
  return (req, res) => {
    const params = assign({}, defaults, req.params, req.query)
    const {icon} = params
    if (icon in octicons) {
      console.warn('getting:', req.url, '->', icon, octicons[icon].options)
      return render(req, res, icon, params)
    } else {
      const keys = Object.keys(octicons)
      const rand = keys[~~(Math.random() * keys.length)]
      const qs = req.url.replace(/^[^\?]+/, '')
      res
        .status(404)
        .set('content-type', 'text/html')
        .send(`No such icon: ${icon}. Try: <a href="/${rand}.svg${qs}">${rand}</a>`)
    }
  }
}

const svg = (req, res, icon, params) => {
  const svg = octicons[icon].toSVG(params)
  return res.send(svg)
}

const png = (req, res, icon, params) => {
  const svg = octicons[icon].toSVG(params)
  const buffer = new Buffer(svg)
  sharp(buffer)
    .toFormat(sharp.format.png)
    .toBuffer()
    .then(png => {
      res
        .set('content-type', 'image/png')
        .send(png)
    })
}

app.get('/:icon.svg', iconRenderer(svg))
app.get('/:icon.png', iconRenderer(png))

module.exports = ({host, port}) => {
  return new Promise((resolve, reject) => {
    app.listen(port, host, function(error) {
      if (error) {
        reject(error)
      } else {
        // this is the server
        resolve(this)
      }
    })
  })
}
