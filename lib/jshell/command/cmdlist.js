JShell.Command.Cmdlist = new JShell.Command('cmdlist', function() {
  var list = JShell.Command.List.all();

  for (var i=0; i < list.length; i++) {
    this.stdout.write(list[i]);
  }

  this.done();
});
