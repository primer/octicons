require "octicons/version"
require "octicons/octicon"
require "json"

module Octicons
  SPRITE_SHEET = File.read(File.join(File.dirname(__FILE__), "sprite.octicons.svg")).freeze
  OCTICON_SYMBOLS = JSON.parse(File.read(File.join(File.dirname(__FILE__), "data.json"))).freeze

  def self.sprite_sheet
    SPRITE_SHEET.sub("><symbol", " style=\"width:0;height:0;visibility:hidden;\"><symbol")
  end
end
