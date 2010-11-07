var JShell = function() {
  this._commands = { };

  this.stdin = new JShell.Stream();
  this.stdout = new JShell.Stream();
  this.stderr = new JShell.Stream();
};

JShell.prototype = {
  execute: function(str) {
    var args = str.split(/\s+/);

    var name = args[0];

    var command = JShell.Command.get(name);

    if (command) {
      return command(args, this);
    } else {
      return this.noCommandFound(str);
    }
  },

  noCommandFound: function(str) {
    this.stdout.write("Command not found: " + str);
  }
};
