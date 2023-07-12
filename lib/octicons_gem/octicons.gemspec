require File.expand_path("../lib/octicons/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "openproject-octicons"
  s.version     = Octicons::VERSION
  s.summary     = "GitHub's octicons gem"
  s.platform    = Gem::Platform::RUBY
  s.description = "A package that distributes Octicons in a gem"
  s.authors     = ["GitHub Inc.", "OpenProject GmbH"]
  s.email       = ["support@openproject.com"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/opf/openproject-octicons"
  s.license     = "MIT"
end
