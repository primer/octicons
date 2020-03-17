module OcticonsV2
  class OcticonV2

    attr_reader :path, :options, :width, :height, :symbol, :keywords

    def initialize(symbol, options = {})
      @symbol = symbol.to_s
      if octicon = get_octicon(@symbol, options)
        @path = octicon[:path]
        @width = octicon[:width]
        @height = octicon[:height]
        @keywords = octicon[:keywords]
        @options = options
        @options.merge!({
          class:   classes,
          viewBox: viewbox,
          version: "1.1"
        })
        @options.merge!(size)
        @options.merge!(a11y)
      else
        raise "Couldn't find octicon symbol for #{@symbol.inspect}"
      end
    end

    # Returns an string representing a <svg> tag
    def to_svg
      "<svg #{html_attributes}>#{@path}</svg>"
    end

    private

    def html_attributes
      attrs = ""
      @options.each { |attr, value| attrs += "#{attr}=\"#{value}\" " }
      attrs.strip
    end

    # add some accessibility features to svg
    def a11y
      accessible = {}

      if @options[:"aria-label"].nil? && @options["aria-label"].nil?
        accessible[:"aria-hidden"] = "true"
      else
        accessible[:role] = "img"
      end

      accessible
    end

    # prepare the octicon class
    def classes
      "octicon octicon-#{@symbol} #{@options[:class]} ".strip
    end

    def viewbox
      "0 0 #{@width} #{@height}"
    end

    # determine the height and width of the octicon based on :size option
    def size
      size = {
        width:  @width,
        height: @height
      }

      # Specific size
      unless @options[:width].nil? && @options[:height].nil?
        size[:width]  = @options[:width].nil?  ? calculate_width(@options[:height]) : @options[:width]
        size[:height] = @options[:height].nil? ? calculate_height(@options[:width]) : @options[:height]
      end

      size
    end

    def calculate_width(height)
      (height.to_i * @width) / @height
    end

    def calculate_height(width)
      (width.to_i * @height) / @width
    end

    def get_octicon(symbol, options = {})
      if octicon = OcticonsV2::OCTICON_SYMBOLS[symbol]
        height = options[:height] || options[:width] || 16
        octicon_height = closest_octicon_height(octicon["heights"].keys, height)
        return {
          name: octicon["name"],
          keywords: octicon["keywords"],
          width: octicon["heights"][octicon_height.to_s]["width"].to_i,
          height: octicon_height,
          path: octicon["heights"][octicon_height.to_s]["path"]
        }
      end
    end

    def closest_octicon_height(octicon_heights, height)
      return octicon_heights.reduce(octicon_heights[0].to_i) do |acc, octicon_height| 
        octicon_height.to_i <= height.to_i ? octicon_height.to_i : acc
      end
    end
  end
end
