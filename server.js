const express = require('express')
const promisify = require('pify')
const chalk = require('chalk')
const app = express()
const getRandomPort = require('get-port')
const hostname = process.env.HOSTNAME || '127.0.0.1'

const svg = require('./lib/serve-svg')
// const getPNG = require('./lib/get-png')

app.get('/:icon.svg', svg)
// app.get('/:icon.png', getPNG)

Promise.resolve(process.env.PORT || getRandomPort())
  .then(port => {
    return new Promise((resolve, reject) => {
      app.listen(port, hostname, function(error) {
        if (error) {
          reject(error)
        } else {
          // this is the server
          resolve(this)
        }
      })
    })
  })
  .then(server => {
    const {address, port} = server.address()
    console.warn('listening on %s',
                 chalk.green(`http://${address}:${port}`))
  })
