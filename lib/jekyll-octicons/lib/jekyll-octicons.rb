require 'octicons'
require 'liquid'
require 'jekyll/liquid_extensions'

module Jekyll
  class Octicons < Liquid::Tag
    include Jekyll::LiquidExtensions

    # Syntax for the octicon symbol
    Syntax = /\A(#{Liquid::VariableSignature}+)/

    # For interpoaltion, look for liquid variables
    Variable = /\{\{\s*([\w]+\.?[\w]*)\s*\}\}/i

    # Copied from Liquid::TagAttributes to allow dashes in tag names:
    #
    #   {% octicon alert area-label:"Hello World!" %}
    #
    TagAttributes = /([\w-]+)\s*\:\s*(#{Liquid::QuotedFragment})/o

    def initialize(tag_name, markup, options)
      super
      @markup = markup
      @options = string_to_hash(markup)
    end

    def render(context)
      @markup.scan Variable do |variable|
        @options = string_to_hash(@markup.gsub(Variable, lookup_variable(context, variable.first)))
      end
      return nil if @options[:symbol].nil?
      ::Octicons::Octicon.new(@options).to_svg
    end

    private

    # Create a ruby hash from a string passed by the jekyll tag
    def string_to_hash(markup)
      options = {}

      if match = markup.match(Syntax)
        options[:symbol] = match[1]

        markup.scan(TagAttributes) do |key, value|
          options[key.to_sym] = value.gsub(/\A"|"\z/, '')
        end
      end

      options
    end
  end
end

Liquid::Template.register_tag('octicon', Jekyll::Octicons)
