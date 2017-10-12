require_relative "./helper"

describe Octicons do
  it "loads all icons on initialization" do
    x_icon = Octicons::OCTICON_SYMBOLS["x"]
    refute_equal 0, Octicons::OCTICON_SYMBOLS.length
    assert x_icon["keywords"]
    assert x_icon["path"]
    assert x_icon["height"]
    assert x_icon["width"]
  end
end
