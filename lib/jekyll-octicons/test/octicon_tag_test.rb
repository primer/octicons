require_relative "./helper"

describe Jekyll::Octicons do
  describe "parsing" do
    it "parses the tag options" do
      output = render("{% octicon logo-github height:32 class:\"left right\" aria-label:hi %}")
      assert_match /height="32"/, output
      assert_match /class="[^"]+ left right/, output
      assert_match /aria-label="hi"/, output
    end

    it "parses interpoaltion of variables" do
      template = render("{% assign symbol = \"logo-github\" %}{% octicon {{ symbol }} %}")
      assert_match /<svg.*octicon-logo-github.*/, template
    end
  end

  describe "rendering" do
    it "renders the svg" do
      output = render("{% octicon logo-github height:32 %}")
      assert_match /<svg.*octicon-logo-github.*/, output
      assert_match /<svg.*width="90".*/, output
    end

    it "renders nothing without a symbol" do
      assert_equal "", render("{% octicon %}")
    end
  end
end
