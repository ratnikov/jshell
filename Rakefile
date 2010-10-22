require 'bundler'

Bundler.setup

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'
require 'packr'

desc "Packages the javascript"
task :pack do
  code = ([ "lib/jshell.js", "lib/jshell/command.js" ] + Dir["lib/**/*.js"]).uniq!.map { |file| File.read file }.join("\n")

  File.open("build/jshell-src.js", 'w') do |file|
    file.puts code
    puts "Wrote to #{file.path}"
  end
  File.open("build/jshell-min.js", 'w') do |file| 
    file.puts Packr.pack(code)
    puts "Wrote to #{file.path}"
  end
end
