# frozen_string_literal: true

require File.expand_path("../lib/octicons/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "octicons"
  s.version     = Octicons::VERSION
  s.summary     = "GitHub's octicons gem"
  s.platform    = Gem::Platform::RUBY
  s.description = "A package that distributes Octicons in a gem"
  s.authors     = ["GitHub Inc."]
  s.email       = ["support@github.com"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/primer/octicons"
  s.license     = "MIT"
end
