JShell.TerminalUI = function(div) {
  JShell.apply(this);

  this.$terminal = jQuery(div);

  var self = this;

  this.$terminal.delegate(":input.readLine.active", 'keyup', function(event) {
    if (event.keyCode === 13) {
      // enter was pressed, submitting
      self.invoke(jQuery(this).parent("div.line"));
    }
  });


  jQuery(function() {
    self.newLine();
  });
};

JShell.TerminalUI.prototype = JShell.inherited({
  focus: function() {
    this.$terminal.find(":input.active").focus();
  },

  newLine: function() {
    this.$terminal.find(":input.active").removeClass("active").attr("disabled", true);

    var line = jQuery('<div class="line">')
      .append('<span class="prompt"> &gt; </span>')
      .append('<input type="text" class="readLine active">');

    this.$terminal.append(line);

    this.focus();
  },

  invoke: function(line) {
    this.stdout.write = function(message) {
      line.append(jQuery("<pre>").html(message));
    };

    this.execute(line.find(":input").attr('value'));

    this.newLine();
  },

  noCommandFound: function(name) {
    this.stdout.write("Command not found: " + name +". Type 'cmdlist' for list of commands.");
  },

  clear: function() {
    this.$terminal.find("div.line").remove();
  }
});

JShell.Command.Clear = new JShell.Command("clear", function(name) {
  this.shell.clear();
});

