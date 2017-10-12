require "octicons/version"
require "octicons/octicon"
require "json"

module Octicons
  OCTICON_SYMBOLS = JSON.parse(File.read(File.join(File.dirname(__FILE__), "data.json"))).freeze
end
