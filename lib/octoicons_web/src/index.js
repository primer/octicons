var data = require('../../build/data.json')

var icons = document.querySelectorAll("[data-icon]");

icons.forEach(function(icon){
  var name = icon.getAttribute("data-icon")
  var width = icon.getAttribute("width")
  var height = icon.getAttribute("height")
  var icon_data = data[name]
  icon_data.options = {
    "version": "1.1",
    "width": width || icon_data.width,
    "height": height || icon_data.width,
    "viewBox": "0 0 " + icon_data.width + " " + icon_data.width,
    "class": "octicon octicon-" + name,
    "aria-hidden": "true"
  }
  icon.insertAdjacentHTML("beforebegin", generateIcon(icon_data))
  icon.parentNode.removeChild(icon);
})

function generateIcon(icon_data){
  var icon =  "<svg " + htmlAttributes(icon_data) + ">" + icon_data.path + "</svg>"
  return icon
}

function htmlAttributes(icon) {
  var attributes = []
  var attrObj = icon.options

  Object.keys(attrObj).forEach(function(option) {
    attributes.push(option + "=\"" + attrObj[option] + "\"")
  })

  return attributes.join(" ").trim()
}
