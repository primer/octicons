const got = require('got')

// Translates a path based on the xy array passed in
const translatePath = (p, xy) => {

  let ds = p.match(/([A-Z]{1,2}[\s0-9\.\-e]+)/g)
  let [x, y] = xy

  let dd = ds.map((d) => {
    var darr = d.split(" ").reverse()
    for(let i = 0; i < darr.length; i += 2) {
      if(darr[i+1]) {
        darr[i] = parseFloat(darr[i]) + y
        darr[i+1] = parseFloat(darr[i+1]) + x
      }
    }

    return darr.reverse().join(" ")
  }).join("") + "Z"

  return dd
}

// Gets the sum of all the `translate(x y)` and reduces it
// <g transform="translate(-238 -286)"><g transform="translate(238 290)">
// becomes [0, 4]
const reduceTranslate = (t) => {
  if(t == null) {
    return [0, 0]
  }
  if(t.length == 1) {
    return t[0].replace(/translate|[\(\)]/g,"").split(" ").map((v) => Math.round(parseFloat(v)))
  }
  return t.reduce((p,c) => {
    p = p.replace(/translate|[\(\)]/g,"").split(" ")
    c = c.replace(/translate|[\(\)]/g,"").split(" ")
    for(let i = 0; i < c.length; i++) {
      c[i] = Math.round(parseFloat(p[i])) + Math.round(parseFloat(c[i]))
    }
    return c
  })
}

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

      let svg = response.body

      let d = svg.match(/ d=["']([a-z\s0-9\.\-]+)["']/i).pop()
      let translate = reduceTranslate(svg.match(/translate\([0-9\-\s\.e]+\)/g))
      let d2 = translatePath(d, translate)

      // Clean and replace svg elements
      svg = svg.replace(`d="${d}"`, `d="${d2}"`)
              .replace(/<\/?defs>/g,"")
              .replace(/<use[^>]*>/g, "")

      resolve(svg)
      // .catch(err => reject(`There was trouble downloading ${url}\n${err}`))
    })
  }
}
