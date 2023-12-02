#!/usr/bin/env ruby

require 'nokogiri'
require 'optparse'

@options = {}
OptionParser.new do |opt|
  opt.on('--input INPUT'){ |o| @options[:input] = o }
  opt.on('--output OUTPUT'){ |o| @options[:output] = o }
end.parse!

if @options[:input] == nil || @options[:output] == nil
  puts 'error: no input or output privided'
  exit
end

puts @options
puts "Starting transformation..."

def get_file_paths
  files = Dir::children @options[:input]
  files
end

def open_file fn
  fd = File.open "#{@options[:input]}/#{fn}"
  fd
end

def transform_file fd
  xml = Nokogiri fd.read
  svg = xml.at('svg')
  zero, nother, width, height = svg['viewBox'].split ' '
  svg["width"] = width
  svg["height"] = height
  tx = xml.to_xml
end

def write_file tx, fn
  fn.gsub! '.svg', '-512.svg'
  out_file_path = "#{@options[:output]}/#{fn}"
  file = File.new out_file_path, 'w'
  file.write tx
end

############################################

unless Dir.exist? @options[:output]
  Dir::mkdir @options[:output]
end

files = get_file_paths
files.each do |fn| # filename
  fd  = open_file fn # filename to filedescriptor
  tf = transform_file fd # file descriptor to transformed xml
  write_file tf, fn # transformed xml to file with filename
end

puts "Done!"
