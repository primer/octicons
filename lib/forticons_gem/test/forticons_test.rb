require_relative "./helper"

describe Forticons do
  it "loads all icons on initialization" do
    refute_equal 0, Forticons::FORTICON_SYMBOLS.length
    x_icon = Forticons::FORTICON_SYMBOLS["x"]
    assert x_icon["name"]
    assert x_icon["keywords"]
    assert x_icon["heights"]
    assert x_icon["heights"]["16"]
    assert x_icon["heights"]["16"]["width"]
    assert x_icon["heights"]["16"]["path"]
  end
end
