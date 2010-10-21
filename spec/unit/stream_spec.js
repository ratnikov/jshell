JSpec.describe("JShell.Stream", function() {
  before(function() {
    stream = new JShell.Stream();
  });

  describe("#write", function() {
    it("should forward information to read", function() {
      expect(stream.write("Hello world")).to(be_true, "Should return true on a successful write");

      expect(stream.read()).to(equal, "Hello world");
    });
  });

  describe("#read", function() {
    it("should return null if stream is empty", function() {
      expect(stream.read()).to(be_null);
    });

    it("should return latest message", function() {
      stream.write("Hello");
      stream.write("World");

      expect(stream.read()).to(equal, "World");
    });
  });
});
