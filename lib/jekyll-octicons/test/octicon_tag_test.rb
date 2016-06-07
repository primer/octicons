require_relative "./helper"

describe Jekyll::Octicons do
  describe "parsing" do
    it "parses the tag options" do
      template = parse('{% octicon :symbol => "logo-github", :size => "large" %}')
      node = template.root.nodelist[0]
      assert node
      assert node.instance_of?(Jekyll::Octicons)
      assert_equal "logo-github", node.options[:symbol]
      assert_equal "large", node.options[:size]
    end
  end

  describe "rendering" do
    it "renders the svg" do
      output = render('{% octicon :symbol => "logo-github", :size => "large" %}')
      assert_match /<svg.*octicon-logo-github.*height="32"/, output
    end

    it "renders nothing without a symbol" do
      assert_equal "", render('{% octicon %}')
    end
  end
end
