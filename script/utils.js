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

module.exports = {progress}
