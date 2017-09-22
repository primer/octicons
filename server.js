const chalk = require('chalk')
const createServer = require('./lib/server')
const getRandomPort = require('get-port')
const host = process.env.HOSTNAME || '127.0.0.1'

Promise.resolve(process.env.PORT || getRandomPort())
  .then(port => createServer({host, port}))
  .then(server => {
    const {address, port} = server.address()
    console.warn('listening on %s',
                 chalk.green(`http://${address}:${port}`))
  })
