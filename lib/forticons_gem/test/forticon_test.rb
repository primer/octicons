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
    icon = forticon("mark-github")
    assert_equal ["octocat", "brand", "github", "logo"], icon.keywords
  end

  it "the attributes are readable" do
    icon = forticon("x")
    assert icon.path
    assert icon.options
    assert_equal "x", icon.symbol
    assert_equal 16, icon.width
    assert_equal 16, icon.height
  end

  describe "viewBox" do
    it "always has a viewBox" do
      icon = forticon("x")
      assert_includes icon.to_svg, "viewBox=\"0 0 16 16\""
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
      assert_includes icon.to_svg, "height=\"16\""
      assert_includes icon.to_svg, "width=\"16\""
    end

    it "converts number string height to integer" do
      icon = forticon("x", height: "60")
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"60\""
    end

    it "converts number height to integer" do
      icon = forticon("x", height: 60)
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"60\""
    end

    it "converts number string width to integer" do
      icon = forticon("x", width: "45")
      assert_includes icon.to_svg, "height=\"45\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "converts number width to integer" do
      icon = forticon("x", width: 45)
      assert_includes icon.to_svg, "height=\"45\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "with height and width passed in" do
      icon = forticon("x", width: 60, height: 60)
      assert_includes icon.to_svg, "width=\"60\""
      assert_includes icon.to_svg, "height=\"60\""
    end

    it "chooses the correct svg given a height" do
      icon = forticon("x", height: 32)
      assert_includes icon.to_svg, "width=\"32\""
      assert_includes icon.to_svg, "height=\"32\""
      assert_includes icon.to_svg, "viewBox=\"0 0 24 24\""
    end

    it "chooses the correct svg given a width" do
      icon = forticon("x", width: 24)
      assert_includes icon.to_svg, "width=\"24\""
      assert_includes icon.to_svg, "height=\"24\""
      assert_includes icon.to_svg, "viewBox=\"0 0 24 24\""
    end

    it "chooses the correct svg given a height and width" do
      icon = forticon("x", height: 24, width: 16)
      assert_includes icon.to_svg, "width=\"16\""
      assert_includes icon.to_svg, "height=\"24\""
      assert_includes icon.to_svg, "viewBox=\"0 0 24 24\""
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
