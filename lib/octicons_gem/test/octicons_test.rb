# frozen_string_literal: true

require_relative "helper"

describe Octicons do
  it "loads all icons on initialization" do
    refute_equal 0, Octicons::OCTICON_SYMBOLS.length
    x_icon = Octicons::OCTICON_SYMBOLS["x"]
    assert x_icon["name"]
    assert x_icon["keywords"]
    assert x_icon["heights"]
    assert x_icon["heights"]["16"]
    assert x_icon["heights"]["16"]["width"]
    assert x_icon["heights"]["16"]["path"]
  end
end
