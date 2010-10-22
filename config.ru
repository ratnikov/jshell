require 'bundler'

Bundler.setup

require 'rake'
require 'packr'

class Application
  def initialize(root)
    @file_server = Rack::File.new(root)

    rebuild_jshell
  end

  def call(env)
    path = env["PATH_INFO"]

    case path
    when '/' then @file_server.call(env.merge('PATH_INFO' => '/index.html'))
    else
      @file_server.call env
    end
  end

  def rebuild_jshell
    code = ([ "lib/jshell.js", "lib/jshell/command.js" ] + Dir["lib/**/*.js"]).uniq!.map { |file| File.read file }.join("\n")

    File.open("demo/jshell-src.js", 'w') { |file| file.puts code }
    File.open("demo/jshell-min.js", 'w') { |file| file.puts Packr.pack(code) }
  end
end

run Application.new('demo')
