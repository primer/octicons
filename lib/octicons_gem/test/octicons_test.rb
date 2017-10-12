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

  it "loads the spritesheet" do
    assert_includes Octicons.sprite_sheet, "<symbol"
    assert_includes Octicons.sprite_sheet, "<svg"
    assert_includes Octicons.sprite_sheet, "xmlns=\"http://www.w3.org/2000/svg\" style=\"width:0;height:0;visibility:hidden;\""
  end
end
