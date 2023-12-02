require File.expand_path("../lib/forticons_helper/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "forticons_helper"
  s.version     = ForticonsHelper::VERSION
  s.summary     = "Forticons rails helper"
  s.description = "A rails helper that makes including svg Forticons simple."
  s.authors     = ["GitHub Inc."]
  s.email       = ["support@github.com"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/anosim114/forticons"
  s.license     = "MIT"

  s.require_paths = ["lib"]

  s.add_dependency "forticons", "0.0.2"
  s.add_dependency "railties"
  s.add_dependency "actionview"
end
