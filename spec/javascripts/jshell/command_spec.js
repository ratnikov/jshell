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

  it("should support done event subscribing", function() {
    var invoked = false;
    var command = new JShell.Command("test", function() {
      this.wasScheduled = true;

      this.done(function() {
	invoked = true;
      });
    });

    var job = shell.execute("test");

    expect(job.wasScheduled).toEqual(true);
    expect(invoked).toEqual(false);

    job.done();

    expect(invoked).toEqual(true);
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
