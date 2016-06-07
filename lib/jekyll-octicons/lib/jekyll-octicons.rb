require 'octicons'
require 'jekyll-octicons/version'
require 'liquid'

module Jekyll
  class Octicons < Liquid::Tag

    def initialize(tag_name, options, tokens)
      super
      @options = string_to_hash(options)
    end

    def render(context)
      return nil if @options[:symbol].nil?
      ::Octicons::Octicon.new(@options).to_svg
    end

    private

    # Create a ruby hash from a string passed by the jekyll tag
    def string_to_hash(options)
      Hash[options.split(",").map do |s|
        s.gsub(/[:\"']/,"").split("=>").map.with_index do |e, i|
          e.strip!
          e = e.to_sym if i == 0
          e
        end
      end]
    end
  end
end

Liquid::Template.register_tag('octicon', Jekyll::Octicons)
