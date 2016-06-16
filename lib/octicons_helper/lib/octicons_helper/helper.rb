require "octicons"
require "action_view"

module OcticonsHelper

  include ActionView::Helpers::TagHelper

  def octicon(symbol, options = {})
    icon = Octicons::Octicon.new(options.merge({ :symbol => symbol }))
    content_tag(:svg, icon.path.html_safe, icon.html_options)
  end
end

module Octicons
  class Octicon
    attr_reader :path, :html_options
  end
end
