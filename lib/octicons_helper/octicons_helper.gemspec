require File.expand_path("../lib/octicons_helper/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "octicons_helper"
  s.version     = OcticonsHelper::VERSION
  s.summary     = "Octicons rails helper"
  s.description = "A rails helper that makes including svg Octicons simple."
  s.authors     = ["GitHub Inc."]
  s.email       = ["support@github.com"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/primer/octicons"
  s.license     = "MIT"

  s.require_paths = ["lib"]

  s.add_dependency "octicons", "17.0.0"
  s.add_dependency "railties"
  s.add_dependency "actionview"
end
