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

  describe("'done' event", function() {
    beforeEach(function() {
      var command = new JShell.Command("test", function() {
	this.wasScheduled = true;
      });
    });

    it("should allow subscribing", function() {
      var job = shell.execute("test");

      var invoked = false;
      expect(job.wasScheduled).toEqual(true);

      job.done(function() {
	invoked = true;
      });

      // should not be executed yet
      expect(invoked).toEqual(false);

      job.done();

      expect(invoked).toEqual(true);
    });

    it("should immediately execute 'done' callback if already done", function() {
      var job = shell.execute("test");

      job.done();

      var callbackExecuted = false;

      job.done(function() {
	callbackExecuted = true;
      });

      expect(callbackExecuted).toEqual(true);
    });
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
