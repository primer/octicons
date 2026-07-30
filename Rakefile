# frozen_string_literal: true

require "bundler"
require "fileutils"

GEM_DIRECTORIES = %w[
  lib/octicons_gem
  lib/octicons_helper
  lib/octicons_jekyll
].freeze

def run_tasks(directory, *tasks, disable_checksum_validation: false)
  Bundler.with_unbundled_env do
    Dir.chdir(directory) do
      sh "bundle", "config", "set", "--local", "disable_checksum_validation", "true" if disable_checksum_validation
      sh "bundle", "install"
      tasks.each { |task| sh "bundle", "exec", "rake", task }
    end
  end
end

desc "Lint all gems"
task :lint do
  GEM_DIRECTORIES.each { |directory| run_tasks(directory, "lint") }
end

desc "Test all gems"
task :test do
  run_tasks("lib/octicons_gem", "test", "build")

  gems = Dir["lib/octicons_gem/pkg/*.gem"]
  raise "No built gem found in lib/octicons_gem/pkg/" if gems.empty?

  gem = gems.max_by { |f| File.mtime(f) }
  %w[lib/octicons_helper lib/octicons_jekyll].each do |directory|
    cache = File.join(directory, "vendor/cache")
    FileUtils.mkdir_p(cache)
    FileUtils.cp(gem, cache)
    run_tasks(directory, "test", disable_checksum_validation: true)
  end
end
