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

  describe("JShell.Command.List", function() {
    it("#all should return all defined commands sorted by name", function() {
      new JShell.Command("foo", function() { });
      new JShell.Command("bar", function() { });

      var list = JShell.Command.List.all();
      expect(list).toContain("foo");
      expect(list).toContain("bar");

      expect(list.indexOf("bar")).toBeLessThan(list.indexOf("foo"));
    });
  });

  afterEach(function() {
    JShell.Command.List.clear();
  });
})
