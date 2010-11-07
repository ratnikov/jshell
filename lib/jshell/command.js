JShell.Command = function(name, scheduledCallback) {
  var command = function(args, shell) {
    var job = new JShell.Command.Job(args, shell);

    job.scheduled = scheduledCallback;

    return job;
  };

  JShell.Command.List.add(name, command);

  return command;
};

JShell.Command.Job = function(args, shell) {
  this.args = args;
  this.shell = shell;
  this.stdin = shell.stdin;
  this.stdout = shell.stdout;
  this.stderr = shell.stderr;

  this._doneCallbacks = [];
};

JShell.Command.Job.prototype = {
  scheduled: function() {
    this.done();
  },

  done: function(callback) {
    if (callback) {
      this._doneCallbacks.push(callback);
    } else {

      for (var i=0; i < this._doneCallbacks.length; i++) {
	this._doneCallbacks[i](this);
      }

      this.shell.jobDone(this);
    }

    return this;
  }
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
