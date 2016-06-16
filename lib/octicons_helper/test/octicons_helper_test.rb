require_relative "./helper"

describe OcticonsHelper do
  it "parses interpoaltion of variables" do
    assert_equal "1.0.0", octicon("alert")
  end
end
