require_relative "./helper"

describe ForticonsHelper do
  describe "rendering" do
    it "renders nothing when no symbol is passed in" do
      assert_equal "", forticon(nil)
    end

    it "renders the svg" do
      assert_includes forticon("x"), "<svg"
      assert_includes forticon("x"), "forticon-x"
      assert_includes forticon("x"), "<\/svg>"
    end

    it "has a path" do
      assert_match /<path/, forticon("suitcase")
    end

    it "adds html attributes to output" do
      assert_match /foo="bar"/, forticon("suitcase", foo: "bar")
    end

    # it "caches SVGs for two calls with the same arguments" do
    #   ForticonsHelper.forticons_helper_cache = {}

    #   mock = Minitest::Mock.new
    #   def mock.path
    #     @@call_count ||= 0
    #     @@call_count += 1

    #     raise "Forticon library called twice" if @@call_count > 1

    #     "foo"
    #   end
    #   def mock.options; end

    #   Forticons::Forticon.stub :new, mock do
    #     forticon("alert")
    #     forticon("alert")
    #   end

    #   ForticonsHelper.forticons_helper_cache = {}
    # end
  end
end
