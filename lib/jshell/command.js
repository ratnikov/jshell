JShell.Command = function(name, callback) {
  var command = function(args, stdin, stdout, stderr) {
    var self = {
      name: name,
      args: args,
      stdin: stdin,
      stdout: stdout,
      stderr: stderr
    };

    return callback.call(self);
  };

  JShell.Command.List.add(name, command);

  return command;
};

JShell.Command.get = function(name) {
  return JShell.Command.List.get(name);
};

JShell.Command.List = {
  _list: { },
  add: function(name, callback) {
         this._list[name] = callback;
       },

  get: function(name) {
         var callback = this._list[name];
         return callback ? callback : null;
       },

  clear: function() {
           this._list = {};
         }
};
