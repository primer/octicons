# frozen_string_literal: true

# rubocop:disable Style/OneClassPerFile
# Prevent bundler errors
module Liquid; class Tag; end; end

module Jekyll
  class Octicons < Liquid::Tag
    VERSION = "19.8.0".freeze
  end
end
# rubocop:enable Style/OneClassPerFile
