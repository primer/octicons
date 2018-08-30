const PQueue = require('p-queue')
const execa = require('execa')
const yaml = require('js-yaml')
const {readFileSync}  = require('fs')

// this works around an issue with the TLS library that
// (apparently) every Node fetch() implementation uses
function fetchSSLFix(url) {
  return execa('curl', ['-sL', url])
    .then(res => res.stdout)
}

function loadYAML(path) {
  return yaml.safeLoad(readFileSync(path, 'utf8'))
}

function progress(current, total) {
  let percentage = Math.ceil((current * 10) / total)
  let bar = [
    "[", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "]",
    ` ${Math.ceil((current * 100) / total)}%`
  ]
  for(let i = 1; i <= percentage; i++) {
    bar[i] = "="
  }
  return bar.join("")
}

function queueTasks(tasks, options) {
  const queue = new PQueue(Object.assign({concurrency: 3}, options))
  for (const task of tasks) {
    queue.add(task)
  }
  queue.start()
  return queue.onIdle()
}

module.exports = {
  fetchSSLFix,
  loadYAML,
  progress,
  queueTasks
}
