const express = require('express')
const app = express()

const octicons = require('..')
const assign = require('object-assign')
const defaults = {
  fill: 'black',
}

const svg = (req, res) => {
  const params = assign({}, defaults, req.params, req.query)
  const {icon} = params
  if (icon in octicons) {
    console.warn('getting:', icon, octicons[icon].options)
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

app.get('/:icon.svg', svg)
// app.get('/:icon.png', getPNG)

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
