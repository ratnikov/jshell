
load('/home/ratnikov/.rvm/gems/ruby-1.9.2-rc2/gems/jspec-4.3.3/lib/jspec.js')
load('/home/ratnikov/.rvm/gems/ruby-1.9.2-rc2/gems/jspec-4.3.3/lib/jspec.xhr.js')
load('lib/jshell.js')
load("lib/jshell/stream.js")
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/stream_spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()
