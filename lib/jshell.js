var JShell = function() {
  this._commands = { };

  this.stdin = new JShell.Stream();
  this.stdout = new JShell.Stream();
  this.stderr = new JShell.Stream();
};

JShell.prototype = {
  addCommand: function(name, callback) {
    this._commands[name] = callback;
  },

  execute: function(str) {
    var args = str.split(/\s+/);

    var name = args[0];

    var command = this._commands[name];

    if (command) {
      return command(args, this.stdin, this.stdout, this.stderr);
    } else {
      return this.noCommandFound(str);
    }
  },

  noCommandFound: function(str) {
    this.stdout.write(str);
  }
};
