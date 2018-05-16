const got = require('got')

module.exports = {
  progress: (current, total) => {
    let percentage = Math.ceil((current * 10) / total)
    let bar = [
      "[", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "]",
      ` ${Math.ceil((current * 100) / total)}%`
    ]
    for(let i = 1; i <= percentage; i++) {
      bar[i] = "="
    }
    return bar.join("")
  },

  downloadSVG: (url, name, downloadProgress) => {
    return new Promise(async (resolve, reject) => {
      const response = await got.get(url, {
        headers: { "Content-Type": "images/svg+xml" }
      }).on('downloadProgress', downloadProgress)

      resolve(response.body)
    })
  }
}
