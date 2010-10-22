run(lambda do |env|
  [ 200, { 'content-Type' => 'text/plain' }, StringIO.new("Hello world!\n") ]
end)
