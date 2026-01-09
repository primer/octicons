# frozen_string_literal: true

require_relative "helper"

describe OcticonsHelper do
  describe "rendering" do
    it "renders nothing when no symbol is passed in" do
      assert_equal "", octicon(nil)
    end

    it "renders the svg" do
      assert_match /<svg.*octicon-x.*>.*<\/svg>/, octicon("x")
    end

    it "has a path" do
      assert_match /<path/, octicon("alert")
    end

    it "adds html attributes to output" do
      assert_match /foo="bar"/, octicon("alert", foo: "bar")
    end

    it "caches SVGs for two calls with the same arguments" do
      OcticonsHelper.octicons_helper_cache = {}

      call_count = 0
      mock = Object.new
      mock.define_singleton_method(:path) do
        call_count += 1
        raise "Octicon library called twice" if call_count > 1
        "foo"
      end
      mock.define_singleton_method(:options) { }

      Octicons::Octicon.stub :new, mock do
        octicon("alert")
        octicon("alert")
      end

      OcticonsHelper.octicons_helper_cache = {}
    end
  end
end
