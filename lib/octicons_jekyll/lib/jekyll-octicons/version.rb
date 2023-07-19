# Prevent bundler errors
module Liquid; class Tag; end; end

module Jekyll
  class Octicons < Liquid::Tag
    VERSION = "19.5.3".freeze
  end
end
