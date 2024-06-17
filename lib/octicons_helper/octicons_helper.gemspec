# frozen_string_literal: true

require File.expand_path("../lib/octicons_helper/version", __FILE__)

Gem::Specification.new do |s|
  s.name        = "openproject-octicons_helper"
  s.version     = OcticonsHelper::VERSION
  s.summary     = "Octicons rails helper"
  s.description = "A rails helper that makes including svg Octicons simple."
  s.authors     = ["GitHub Inc.", "OpenProject GmbH"]
  s.email       = ["support@openproject.com"]
  s.files       = Dir["{lib}/**/*"] + ["LICENSE", "README.md"]
  s.homepage    = "https://github.com/opf/openproject-octicons"
  s.license     = "MIT"
  s.metadata    = { "rubygems_mfa_required" => "false" }

  s.require_paths = ["lib"]

  s.add_dependency "openproject-octicons", "19.14.1"
  s.add_dependency "railties"
  s.add_dependency "actionview"
end
