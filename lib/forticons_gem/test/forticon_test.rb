require_relative "./helper"

describe Forticons::Forticon do
  it "fails when the forticon doesn't exist" do
    assert_raises(RuntimeError) do
      forticon("forticon")
    end
  end

  it "initialize accepts a string for an icon" do
    icon = forticon("x")
    assert icon
  end

  it "initialize accepts a symbol for an icon" do
    icon = forticon(:x)
    assert icon
  end

  it "gets keywords for the icon" do
    icon = forticon("x")
    assert_equal ["remove", "close", "delete"], icon.keywords
  end

  it "the attributes are readable" do
    icon = forticon("x")
    assert icon.path
    assert icon.options
    assert_equal "x", icon.symbol
    assert_equal 384, icon.width
    assert_equal 512, icon.height
  end

  describe "viewBox" do
    it "always has a viewBox" do
      icon = forticon("x")
      assert_includes icon.to_svg, "viewBox=\"0 0 384 512\""
    end
  end

  describe "html_attributes" do
    it "includes other html attributes" do
      icon = forticon("x", foo: "bar", disabled: "true")
      assert_includes icon.to_svg, "disabled=\"true\""
      assert_includes icon.to_svg, "foo=\"bar\""
    end
  end

  describe "classes" do
    it "includes classes passed in" do
      icon = forticon("x", class: "text-closed")
      assert_includes icon.to_svg, "class=\"forticon forticon-x text-closed\""
    end
  end

  describe "size" do
    it "always has width and height" do
      icon = forticon("x")
      assert_includes icon.to_svg, "height=\"512\""
      assert_includes icon.to_svg, "width=\"384\""
    end

    it "converts number string height to integer" do
      icon = forticon("x", height: 60)
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "converts number height to integer" do
      icon = forticon("x", height: 60)
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "converts number string width to integer" do
      icon = forticon("x", width: "45")
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "converts number width to integer" do
      icon = forticon("x", width: 45)
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "with height and width passed in" do
      icon = forticon("x", width: 60, height: 60)
      assert_includes icon.to_svg, "width=\"60\""
      assert_includes icon.to_svg, "height=\"60\""
    end
  end

  describe "a11y" do
    it "includes attributes for symbol keys" do
      icon = forticon("x", "aria-label": "Close")
      assert_includes icon.to_svg, "role=\"img\""
      assert_includes icon.to_svg, "aria-label=\"Close\""
      refute_includes icon.to_svg, "aria-hidden"
    end

    it "includes attributes for string keys" do
      icon = forticon("x", "aria-label" => "Close")
      assert_includes icon.to_svg, "role=\"img\""
      assert_includes icon.to_svg, "aria-label=\"Close\""
      refute_includes icon.to_svg, "aria-hidden"
    end

    it "has aria-hidden when no label is passed in" do
      icon = forticon("x")
      assert_includes icon.to_svg, "aria-hidden=\"true\""
    end
  end
end
