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
      expect(ret.shell).toEqual(shell);
      expect(ret.stdin).toEqual(shell.stdin);
      expect(ret.stdout).toEqual(shell.stdout);
      expect(ret.stderr).toEqual(shell.stderr);
    });

    it("should print error message to stdout on unknown command", function() {
      shell.execute("invoke unknown command");

      expect(shell.stderr.read()).toEqual("Command not found: invoke unknown command");
    });

    it("should allow overriding behavior when command is not found by overriding noCommandFound", function() {
      shell.noCommandFound = function(name) {
        expect(name).toEqual("unknown command");
      };

      shell.execute("unknown command");
    });
  });

  describe("inherited", function() {

    it("should return an object linked up to the base", function() {
      var extension = function() {
	this.instanceKey = 'instance-value';
      };

      extension.prototype = JShell.inherited({
	foo : 'bar'
      });

      var instance = new extension();

      expect(instance.instanceKey).toEqual('instance-value');
      expect(instance.foo).toEqual('bar');

      expect(instance.execute).toBeDefined();

      expect(instance.stdin).toBeUndefined();
    });
  });
});
