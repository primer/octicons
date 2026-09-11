# frozen_string_literal: true

require_relative "helper"

describe OcticonsHelper do
  describe "rendering" do
    %w[bookmark-filled repo-deleted play].each do |name|
      it "renders the #{name} compatibility name" do
        output = octicon(name, height: 24)
        natural_height = name == "play" ? 24 : 16
        assert_match /octicon-#{name}/, output
        assert_match /height="24"/, output
        assert_match /viewBox="0 0 #{natural_height} #{natural_height}"/, output
      end
    end

    it "preserves unsized canonical helper defaults" do
      %w[bookmark-fill repo-delete].each do |name|
        assert_match /height="24"/, octicon(name)
        assert_match /viewBox="0 0 16 16"/, octicon(name, height: 16)
      end
    end

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

      mock = Minitest::Mock.new
      def mock.path
        @call_count ||= 0
        @call_count += 1

        raise "Octicon library called twice" if @call_count > 1

        "foo"
      end
      def mock.options; end

      Octicons::Octicon.stub :new, mock do
        octicon("alert")
        octicon("alert")
      end

      OcticonsHelper.octicons_helper_cache = {}
    end
  end
end
