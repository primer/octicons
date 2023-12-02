require File.expand_path("../lib/forticons/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "forticons"
  s.version     = Forticons::VERSION
  s.summary     = "Octicons like FontAwesome icon library"
  s.platform    = Gem::Platform::RUBY
  s.description = "A package that distributes FontAwesome icons in a gem"
  s.authors     = ["anosim114"]
  s.email       = ["arnold_siemens@pm.me"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/anosim114/forticons"
  s.license     = "MIT"
end
