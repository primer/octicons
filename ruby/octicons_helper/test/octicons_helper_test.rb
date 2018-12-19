require_relative "./helper"

describe OcticonsHelper do
  describe "rendering" do
    it "renders nothing when no symbol is passed in" do
      assert_equal "", octicon(nil)
    end

    it "renders the svg" do
      assert_match /<svg.*octicon-x.*><path.*\/><\/svg>/, octicon("x")
    end

    it "has a path" do
      assert_match /<path/, octicon("alert")
    end

    it "adds html attributes to output" do
      assert_match /foo="bar"/, octicon("alert", foo: "bar")
    end
  end
end
