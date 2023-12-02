require "forticons/version"
require "forticons/forticon"
require "json"

module Forticons
  file_data = File.read(File.join(File.dirname(__FILE__), "./build/data.json"))
  FORTICON_SYMBOLS = JSON.parse(file_data).freeze
end
