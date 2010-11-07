describe("JShell.Command.Cmdlist", function() {
  var shell;

  beforeEach(function() { 
    shell = new JShell();
  });

  it("should list all commands defined", function() {
    var foo = new JShell.Command("foo", function() { });
    var bar = new JShell.Command("bar", function() { });

    shell.execute("cmdlist");

    var lines = shell.stdout.readAll();

    expect(lines).toContain("foo");
    expect(lines).toContain("bar");
  });

  it("should not remain a zombie after", function() {
    shell.execute("cmdlist");

    expect(shell.jobs()).toEqual([ null ]);
  });
});
