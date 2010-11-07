var JShell = function() {
  this._commands = { };

  this.stdin = new JShell.Stream();
  this.stdout = new JShell.Stream();
  this.stderr = new JShell.Stream();

  this._jobs = [];
};

JShell.inherited = function(properties) {
  var base = new JShell;

  for (var key in base) {
    delete base[key];
  }

  if (properties) {
    for (var property in properties) {
      base[property] = properties[property];
    }
  }

  return base;
};

JShell.prototype = {
  execute: function(str) {
    var args = str.split(/\s+/);

    var name = args[0];

    var command = JShell.Command.get(name);

    if (command) {
      var job = command(args, this);

      this._jobs.push(job);

      job.scheduled();

      return job;
    } else {
      this.noCommandFound(str);

      return null;
    }
  },

  jobs: function() {
    return this._jobs;
  },

  jobDone: function(job) {
    var jobs = this.jobs();

    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i] === job) {
	jobs[i] = null;

	return job;
      }
    }

    return null;
  },

  noCommandFound: function(str) {
    this.stderr.write("Command not found: " + str);
  }
};
