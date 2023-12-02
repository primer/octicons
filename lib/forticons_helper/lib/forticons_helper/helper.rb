require "forticons"
require "action_view"

module ForticonsHelper
  include ActionView::Helpers::TagHelper

  mattr_accessor :forticons_helper_cache, default: {}

  def forticon(symbol, options = {})
    return "" if symbol.nil?

    cache_key = [symbol, options]

    if tag = forticons_helper_cache[cache_key]
      tag
    else
      icon = Forticons::Forticon.new(symbol, options)

      tag = content_tag(:svg, icon.path.html_safe, icon.options).freeze # rubocop:disable Rails/OutputSafety
      forticons_helper_cache[cache_key] = tag
      tag
    end
  end
end
