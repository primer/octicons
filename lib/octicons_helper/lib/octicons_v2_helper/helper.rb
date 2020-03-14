require "octicons_v2"
require "action_view"

module OcticonsV2Helper

  include ActionView::Helpers::TagHelper

  def octicon_v2(symbol, options = {})
    return "" if symbol.nil?

    icon = OcticonsV2::OcticonV2.new(symbol, options)
    content_tag(:svg, icon.path.html_safe, icon.options) # rubocop:disable Rails/OutputSafety
  end
end
