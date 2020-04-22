require "minitest/autorun"
require "jekyll-octicons_v2"

# Parse a string into a liquid template
def parse(string)
  Liquid::Template.parse(string)
end

# Parse and render a string
def render(string, assigns = {})
  parse(string).render!(assigns)
end
