require "octicons"
require "action_view"

module OcticonsHelper

  include ActionView::Helpers::TagHelper

  def octicon(symbol, options = {})
    return "" if symbol.nil?

    icon = Octicons::Octicon.new(symbol, options)
    content_tag(:svg, icon.path.html_safe, icon.options) # rubocop:disable Rails/OutputSafety
  end
end
