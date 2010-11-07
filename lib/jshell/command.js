JShell.Command = function(name, callback) {
  var command = function(args, shell) {
    var self = {
      name: name,
      args: args,
      shell: shell,
      stdin: shell.stdin,
      stdout: shell.stdout,
      stderr: shell.stderr
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

  all: function() {
         var cmdlist = [ ];
         for (var key in this._list) {
           cmdlist.push(key);
         }

         return cmdlist.sort();
       },

  clear: function() {
           this._list = {};
         }
};
