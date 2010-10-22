JShell.Stream = function() {
  this._messages = [];
};

JShell.Stream.prototype = {
  read: function() {
          var latest = this._messages.shift();

          if (typeof(latest) !== 'undefined') {
            return latest;
          } else {
            return null;
          }
        },
  write: function(message) {
           this._messages.push(message);
           return true;
         },

  readAll: function() {
             var lines = [];
             var line;
             while (line = this.read()) {
               lines.push(line);
             }

             return lines;
           }
};
