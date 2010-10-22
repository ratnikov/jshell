JShell.Stream = function() {
  this._messages = [];
};

JShell.Stream.prototype = {
  read: function() {
          var latest = this._messages.pop();

          if (typeof(latest) !== 'undefined') {
            return latest;
          } else {
            return null;
          }
        },
  write: function(message) {
           this._messages.push(message);
           return true;
         }
};
