require "minitest/autorun"
require "octicons_v2"

def octicon_v2(symbol, options = {})
  ::OcticonsV2::OcticonV2.new(symbol, options)
end
