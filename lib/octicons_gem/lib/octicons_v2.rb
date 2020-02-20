require "octicons_v2/version"
require "octicons_v2/octicon_v2"
require "json"

module OcticonsV2
  file_data = File.read(File.join(File.dirname(__FILE__), "./build/data.json"))
  OCTICON_SYMBOLS = JSON.parse(file_data).freeze
end
