require File.expand_path("../lib/jekyll-octicons/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "jekyll-octicons"
  s.version     = Jekyll::Octicons::VERSION
  s.summary     = "Octicons jekyll liquid tag"
  s.description = "A jekyll liquid plugin that makes including svg Octicons simple."
  s.authors     = ["GitHub Inc."]
  s.email       = ["support@github.com"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/primer/octicons"
  s.license     = "MIT"

  s.require_paths = ["lib"]

  s.add_dependency "jekyll", ">= 3.6", "< 5.0"
  s.add_dependency "octicons", "17.0.0"
end
