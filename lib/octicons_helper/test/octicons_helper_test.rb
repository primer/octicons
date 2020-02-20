require_relative "./helper"

describe OcticonsV2Helper do
  describe "rendering" do
    it "renders nothing when no symbol is passed in" do
      assert_equal "", octicon_v2(nil)
    end

    it "renders the svg" do
      assert_match /<svg.*octicon-x.*><path.*\/><\/svg>/, octicon_v2("x")
    end

    it "has a path" do
      assert_match /<path/, octicon_v2("alert")
    end

    it "adds html attributes to output" do
      assert_match /foo="bar"/, octicon_v2("alert", foo: "bar")
    end
  end
end
