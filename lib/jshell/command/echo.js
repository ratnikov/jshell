JShell.Command.Echo = new JShell.Command("echo", function() {
  if (this.args.length > 1) {

    if (this.args[1] === '-h' || this.args[1] === '--help') {
      this.stdout.write(JShell.Command.Echo.help());

    } else {
      this.stdout.write(this.args.slice(1).join(' '));
    }
  } else {

    // nothing to echo
    return;
  }

  this.done();
});

JShell.Command.Echo.help = function() {
  return "echo: display a line of text";
};
