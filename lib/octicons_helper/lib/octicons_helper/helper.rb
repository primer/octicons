require "octicons"
require "action_view"

module OcticonsHelper
  include ActionView::Helpers::TagHelper

  mattr_accessor :octicons_helper_cache, default: {}

  def octicon(symbol, options = {})
    return "" if symbol.nil?

    cache_key = [symbol, options].to_s

    if octicons_helper_cache[cache_key]
      octicons_helper_cache[cache_key]
    else
      icon = Octicons::Octicon.new(symbol, options)

      tag = content_tag(:svg, icon.path.html_safe, icon.options).freeze # rubocop:disable Rails/OutputSafety
      octicons_helper_cache[cache_key] = tag
      tag
    end
  end
end
