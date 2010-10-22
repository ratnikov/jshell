describe("JShell.Command.Echo", function() {
  var shell;

  beforeEach(function() {
    shell = new JShell();
  });

  it("should output the string specified", function() {
    shell.execute("echo hello world");

    expect(shell.stdout.read()).toEqual("hello world");
  })

  it("should do nothing if no arguments are supplied", function() {
    shell.execute("echo");

    expect(shell.stdout.read()).toBeNull();
  });

  it("should support help message", function() {
    shell.execute("echo -h");

    expect(shell.stdout.read()).toEqual(JShell.Command.Echo.help());

    shell.execute("echo --help");
    expect(shell.stdout.read()).toEqual(JShell.Command.Echo.help());
  });
});
