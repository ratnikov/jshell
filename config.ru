require 'bundler'

Bundler.setup

require 'rake'
require 'packr'

class Application
  def initialize(root)
    @file_server = Rack::File.new(root)
  end

  def call(env)
    path = env["PATH_INFO"]

    case path
    when '/' then @file_server.call(env.merge('PATH_INFO' => '/index.html'))
    when /jshell.*\.js/ then [ 200, { 'Content-Type' => 'text/javascript' }, [ jshell_code ] ]
    else
      @file_server.call env
    end
  end

  def jshell_code
    @jshell_code ||= ([ "lib/jshell.js", "lib/jshell/command.js" ] + Dir["lib/**/*.js"]).uniq!.map { |file| File.read file }.join("\n")

    @jshell_code
  end
end

run Application.new('demo')
