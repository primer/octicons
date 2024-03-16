# frozen_string_literal: true

require "minitest/autorun"
require "octicons"

def octicon(symbol, options = {})
  Octicons::Octicon.new(symbol, options)
end
