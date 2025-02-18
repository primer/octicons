# frozen_string_literal: true

require "minitest/autorun"
require "jekyll-octicons"

# Parse a string into a liquid template
# rubocop:disable Rails/Delegate
def parse(string)
  Liquid::Template.parse(string)
end
# rubocop:enable Rails/Delegate

# Parse and render a string
def render(string, assigns = {})
  parse(string).render!(assigns)
end
