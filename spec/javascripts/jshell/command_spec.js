describe("JShell.Command", function() {
  var shell;

  beforeEach(function() {
    shell = new JShell();
  });

  it("should allow creating commands", function() {
    var callbackInvoked = false;

    var command = new JShell.Command("test", function() {
      callbackInvoked = true;

      return this;
    });

    var ret = shell.execute("test foo bar");

    expect(callbackInvoked).toEqual(true);

    expect(ret.args).toEqual([ "test", "foo", "bar" ]);
    expect(ret.stdin).toEqual(shell.stdin);
  });

  afterEach(function() {
    JShell.Command.List.clear();
  });
})
