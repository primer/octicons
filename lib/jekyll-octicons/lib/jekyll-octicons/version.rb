# Prevent bundler errors
module Liquid; class Tag; end; end

module Jekyll
  class Octicons < Liquid::Tag
    VERSION = "4.0.3".freeze
  end
end
