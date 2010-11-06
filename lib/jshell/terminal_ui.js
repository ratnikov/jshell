JShell.TerminalUI = function(div) {
  var $terminal = jQuery(div);

  var shell = new JShell();

  shell.newLine = function() {
    jQuery(":input.active").removeClass("active").attr("disabled", true);

    var line = jQuery('<div class="line">')
    .append('<span class="prompt"> &gt; </span>')
    .append('<input type="text" class="readLine active">');

    $terminal.append(line);

    line.find(":input").focus();
  };

  shell.invoke = function(line) {
    shell.stdout.write = function(message) {
      line.append(jQuery("<pre>").html(message));
    };

    shell.execute(line.find(":input").attr('value'));

    shell.newLine();
  };

  shell.noCommandFound = function(name) {
    this.stdout.write("Command not found: " + name +". Type 'cmdlist' for list of commands.");
  };

  var clear = new JShell.Command("clear", function() {
    $terminal("div.line").remove();
  });

  $terminal.delegate(":input.readLine.active", 'keyup', function(event) {
    if (event.keyCode === 13) {
      // enter was pressed, submitting
      shell.invoke(jQuery(this).parent("div.line"));
    }
  });

  shell.newLine();

  return shell;
};
