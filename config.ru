class Application
  def initialize(root)
    @file_server = Rack::File.new(root)
  end

  def call(env)
    path = env["PATH_INFO"]

    case path
    when '/' then @file_server.call(env.merge('PATH_INFO' => '/index.html'))
    else
      @file_server.call env
    end
  end
end

run Application.new('demo')
