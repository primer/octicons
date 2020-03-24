require_relative "./helper"

describe OcticonsV2 do
  it "loads all icons on initialization" do
    refute_equal 0, OcticonsV2::OCTICON_SYMBOLS.length
    x_icon = OcticonsV2::OCTICON_SYMBOLS["x"]
    assert x_icon["name"]
    assert x_icon["keywords"]
    assert x_icon["heights"]
    assert x_icon["heights"]["16"]
    assert x_icon["heights"]["16"]["width"]
    assert x_icon["heights"]["16"]["path"]
  end
end
