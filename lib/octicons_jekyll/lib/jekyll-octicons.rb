require "octicons"
require "jekyll-octicons/version"
require "liquid"
require "jekyll/liquid_extensions"

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

      # If there's interpoaltion going on, we need to do this in render
      prepare(markup) unless match = markup.match(Variable)
    end

    def render(context)
      prepare(interpolate(@markup, context)) if match = @markup.match(Variable)

      return nil if @symbol.nil?
      ::Octicons::Octicon.new(@symbol, @options).to_svg
    end

    private

    def interpolate(markup, context)
      markup.scan Variable do |variable|
        markup = markup.gsub(Variable, lookup_variable(context, variable.first))
      end
      markup
    end

    def prepare(markup)
      @symbol = symbol(markup)
      @options = string_to_hash(markup)
    end

    def symbol(markup)
      if match = markup.match(Syntax)
        match[1]
      end
    end

    # Create a ruby hash from a string passed by the jekyll tag
    def string_to_hash(markup)
      options = {}

      if match = markup.match(Syntax)
        markup.scan(TagAttributes) do |key, value|
          options[key.to_sym] = value.gsub(/\A"|"\z/, "")
        end
      end

      options
    end
  end
end

Liquid::Template.register_tag("octicon", Jekyll::Octicons)
