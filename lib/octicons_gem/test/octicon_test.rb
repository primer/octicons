# frozen_string_literal: true

require_relative "helper"

describe Octicons::Octicon do
  describe "compatibility names" do
    {
      "bookmark-filled" => ["bookmark-fill", [16]],
      "repo-deleted" => ["repo-delete", [16]],
      "play" => ["triangle-circle", [16, 24]]
    }.each do |name, (canonical, heights)|
      it "preserves #{name} artwork, classes, and sizing" do
        [16, 20, 24, 32, 64].each do |height|
          natural_height = heights.include?(24) && height >= 24 ? 24 : 16
          icon = octicon(name, height: height, class: "custom")
          assert_equal name, icon.symbol
          assert_equal natural_height, icon.height
          assert_equal octicon(canonical, height: natural_height).path, icon.path
          assert_includes icon.to_svg, "octicon-#{name} custom"
          assert_includes icon.to_svg, "height=\"#{height}\""
        end
      end
    end

    %w[bookmark-fill repo-delete].each do |name|
      it "preserves the unsized #{name} default" do
        assert_equal 24, octicon(name).height
        assert_equal 24, octicon(name, class: "custom").height
        assert_equal 16, octicon(name, height: 16).height
        assert_equal 16, octicon(name, width: 16).height
      end
    end

    it "keeps play circled and exposes the new icons" do
      assert_equal 16, octicon("play").height
      assert_equal octicon("triangle-circle").path, octicon("play").path
      refute_equal octicon("triangle").path, octicon("play").path
      %w[triangle triangle-circle triangle-fill].each do |name|
        assert_equal 16, octicon(name, height: 16).height
        assert_equal 24, octicon(name, height: 24).height
      end
      assert_equal 16, octicon("git-pull-request-unlisted", height: 24).height
    end
  end

  it "fails when the octicon doesn't exist" do
    assert_raises(RuntimeError) do
      octicon("octicon")
    end
  end

  it "initialize accepts a string for an icon" do
    icon = octicon("x")
    assert icon
  end

  it "initialize accepts a symbol for an icon" do
    icon = octicon(:x)
    assert icon
  end

  it "gets keywords for the icon" do
    icon = octicon("mark-github")
    assert_equal ["octocat", "brand", "github", "logo"], icon.keywords
  end

  it "the attributes are readable" do
    icon = octicon("x")
    assert icon.path
    assert icon.options
    assert_equal "x", icon.symbol
    assert_equal 16, icon.width
    assert_equal 16, icon.height
  end

  describe "viewBox" do
    it "always has a viewBox" do
      icon = octicon("x")
      assert_includes icon.to_svg, "viewBox=\"0 0 16 16\""
    end
  end

  describe "html_attributes" do
    it "includes other html attributes" do
      icon = octicon("x", foo: "bar", disabled: "true")
      assert_includes icon.to_svg, "disabled=\"true\""
      assert_includes icon.to_svg, "foo=\"bar\""
    end
  end

  describe "classes" do
    it "includes classes passed in" do
      icon = octicon("x", class: "text-closed")
      assert_includes icon.to_svg, "class=\"octicon octicon-x text-closed\""
    end
  end

  describe "size" do
    it "always has width and height" do
      icon = octicon("x")
      assert_includes icon.to_svg, "height=\"16\""
      assert_includes icon.to_svg, "width=\"16\""
    end

    it "converts number string height to integer" do
      icon = octicon("x", height: "60")
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"60\""
    end

    it "converts number height to integer" do
      icon = octicon("x", height: 60)
      assert_includes icon.to_svg, "height=\"60\""
      assert_includes icon.to_svg, "width=\"60\""
    end

    it "converts number string width to integer" do
      icon = octicon("x", width: "45")
      assert_includes icon.to_svg, "height=\"45\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "converts number width to integer" do
      icon = octicon("x", width: 45)
      assert_includes icon.to_svg, "height=\"45\""
      assert_includes icon.to_svg, "width=\"45\""
    end

    it "with height and width passed in" do
      icon = octicon("x", width: 60, height: 60)
      assert_includes icon.to_svg, "width=\"60\""
      assert_includes icon.to_svg, "height=\"60\""
    end

    it "chooses the correct svg given a height" do
      icon = octicon("x", height: 32)
      assert_includes icon.to_svg, "width=\"32\""
      assert_includes icon.to_svg, "height=\"32\""
      assert_includes icon.to_svg, "viewBox=\"0 0 24 24\""
    end

    it "chooses the correct svg given a width" do
      icon = octicon("x", width: 24)
      assert_includes icon.to_svg, "width=\"24\""
      assert_includes icon.to_svg, "height=\"24\""
      assert_includes icon.to_svg, "viewBox=\"0 0 24 24\""
    end

    it "chooses the correct svg given a height and width" do
      icon = octicon("x", height: 24, width: 16)
      assert_includes icon.to_svg, "width=\"16\""
      assert_includes icon.to_svg, "height=\"24\""
      assert_includes icon.to_svg, "viewBox=\"0 0 24 24\""
    end
  end

  describe "a11y" do
    it "includes attributes for symbol keys" do
      icon = octicon("x", "aria-label": "Close")
      assert_includes icon.to_svg, "role=\"img\""
      assert_includes icon.to_svg, "aria-label=\"Close\""
      refute_includes icon.to_svg, "aria-hidden"
    end

    it "includes attributes for string keys" do
      icon = octicon("x", "aria-label" => "Close")
      assert_includes icon.to_svg, "role=\"img\""
      assert_includes icon.to_svg, "aria-label=\"Close\""
      refute_includes icon.to_svg, "aria-hidden"
    end

    it "has aria-hidden when no label is passed in" do
      icon = octicon("x")
      assert_includes icon.to_svg, "aria-hidden=\"true\""
    end
  end

  describe "data-component" do
    it "has data-component attribute" do
      icon = octicon("x")
      assert_includes icon.to_svg, "data-component=\"Octicon\""
    end

    it "allows data-component to be overridden" do
      icon = octicon("x", "data-component": "CustomComponent")
      assert_includes icon.to_svg, "data-component=\"CustomComponent\""
      refute_includes icon.to_svg, "data-component=\"Octicon\""
    end
  end
end
