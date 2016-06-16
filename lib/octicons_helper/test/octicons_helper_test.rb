require_relative "./helper"

describe OcticonsHelper do
  it "builds an icon with just the symbol passed in" do
    assert_match /<svg class="octicon octicon-alert"/, octicon("alert")
  end

  it "has a path" do
    assert_match /<path/, octicon("alert")
  end

  it "adds html attributes to output" do
    assert_match /foo="bar"/, octicon("alert", :foo => "bar")
  end
end
