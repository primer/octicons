const assign = require('object-assign')
const express = require('express')
const octicons = require('..')
const sharp = require('sharp')

const app = express()
const DEFAULT_OPTIONS = {
  fill: 'black',
}

const renderAs = handler => {
  return (req, res) => {
    const params = assign(
      {},
      DEFAULT_OPTIONS,
      req.params,
      req.query
    )
    const {symbol} = params
    if (symbol in octicons) {
      console.warn('getting: %s -> %s',
                   req.url, symbol, octicons[symbol].options)
      return handler(req, res, symbol, params)
    } else {
      const keys = Object.keys(octicons)
      const rand = keys[~~(Math.random() * keys.length)]
      const qs = req.url.replace(/^[^\?]+/, '')
      res
        .status(404)
        .set('content-type', 'text/html')
        .send(`No such symbol: ${symbol}. Try: <a href="/${rand}.svg${qs}">${rand}</a>`)
    }
  }
}

const svg = (req, res, symbol, params) => {
  const svg = octicons[symbol].toSVG(params)
  return res.send(svg)
}

const png = (req, res, symbol, params) => {
  const svg = octicons[symbol].toSVG(params)
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

app.get('/:symbol.svg', renderAs(svg))
app.get('/:symbol.png', renderAs(png))

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
