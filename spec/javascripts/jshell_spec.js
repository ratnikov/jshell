describe("JShell", function() {
  var shell;

  beforeEach(function() {
    shell = new JShell();
  });

  describe("commands", function() {
    var command;
    beforeEach(function() {
      
      var testCommand = new JShell.Command('test', function() {
        return this;
      });
    });

    it("should support commands without arguments", function() {
      var ret = shell.execute("test");

      expect(ret.args).toEqual([ "test" ]);
    });

    it("should invoke existing command with args and streams", function() {

      var ret = shell.execute("test foo bar");

      expect(ret).toBeDefined();

      expect(ret.args).toEqual([ "test", "foo", "bar" ]);
      expect(ret.stdin).toEqual(shell.stdin);
      expect(ret.stdout).toEqual(shell.stdout);
      expect(ret.stderr).toEqual(shell.stderr);
    });

    it("should invoke noCommandFound if no command is located", function() {
      spyOn(shell, 'noCommandFound');

      shell.execute("invoke unknown command");

      expect(shell.noCommandFound).toHaveBeenCalledWith("invoke unknown command");
   });
  });
});
