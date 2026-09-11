# frozen_string_literal: true

require_relative "helper"

describe Jekyll::Octicons do
  describe "parsing" do
    it "parses the tag options" do
      output = render("{% octicon mark-github height:32 class:\"left right\" aria-label:hi %}")
      assert_match /height="32"/, output
      assert_match /class="[^"]+ left right/, output
      assert_match /aria-label="hi"/, output
    end

    it "parses interpolation of variables" do
      template = render("{% assign symbol = \"mark-github\" %}{% octicon {{ symbol }} %}")
      assert_match /<svg.*octicon-mark-github.*/, template
    end
  end

  describe "rendering" do
    %w[bookmark-filled repo-deleted play].each do |name|
      it "renders the #{name} compatibility name" do
        output = render("{% octicon #{name} height:24 %}")
        natural_height = name == "play" ? 24 : 16
        assert_match /octicon-#{name}/, output
        assert_match /height="24"/, output
        assert_match /viewBox="0 0 #{natural_height} #{natural_height}"/, output
      end
    end

    it "supports the new names without changing existing defaults" do
      %w[triangle triangle-circle triangle-fill git-pull-request-unlisted].each do |name|
        assert_match /octicon-#{name}/, render("{% octicon #{name} %}")
      end
      %w[bookmark-fill repo-delete].each do |name|
        assert_match /height="24"/, render("{% octicon #{name} %}")
      end
    end

    it "renders the svg" do
      output = render("{% octicon mark-github height:32 %}")
      assert_match /<svg.*octicon-mark-github.*/, output
      assert_match /<svg.*width="32".*/, output
    end

    it "renders nothing without a symbol" do
      assert_equal "", render("{% octicon %}")
    end
  end
end
