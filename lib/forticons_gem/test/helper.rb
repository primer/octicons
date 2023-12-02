require "minitest/autorun"
require "forticons"

def forticon(symbol, options = {})
  ::Forticons::Forticon.new(symbol, options)
end
