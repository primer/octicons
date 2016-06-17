require_relative "./helper"

describe Jekyll::Octicons do
  describe "parsing" do
    it "parses the tag options" do
      template = parse('{% octicon logo-github height:32 class:"left right" aria-label:hi %}')
      node = template.root.nodelist.last
      assert node
      assert node.instance_of?(Jekyll::Octicons)
      assert_equal "32", node.options[:height]
      assert_equal "left right", node.options[:class]
      assert_equal "hi", node.options[:"aria-label"]
    end

    it "parses interpoaltion of variables" do
      template = render('{% assign symbol = "logo-github" %}{% octicon {{ symbol }} %}')
      assert_match /<svg.*octicon-logo-github.*/, template
    end
  end

  describe "rendering" do
    it "renders the svg" do
      output = render('{% octicon logo-github height:32 %}')
      assert_match /<svg.*octicon-logo-github.*/, output
      assert_match /<svg.*width="90".*/, output
    end

    it "renders nothing without a symbol" do
      assert_equal "", render('{% octicon %}')
    end
  end
end
