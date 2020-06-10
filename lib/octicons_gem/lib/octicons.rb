require "octicons/version"
require "octicons/octicon"
require "json"

module Octicons
  file_data = File.read(File.join(File.dirname(__FILE__), "./build/data.json"))
  OCTICON_SYMBOLS = JSON.parse(file_data).freeze
end
