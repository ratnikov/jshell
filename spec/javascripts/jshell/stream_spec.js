
describe("JShell.Stream", function() {
  var stream;

  beforeEach(function() {
    stream = new JShell.Stream();
  });

  describe("#write", function() {
    it("should forward information to read", function() {
      expect(stream.write("Hello world")).toEqual(true);

      expect(stream.read()).toEqual("Hello world");
    });
  });

  describe("#read", function() {
    it("should return null if stream is empty", function() {
      expect(stream.read()).toBeNull();
    });

    it("should return latest message", function() {
      stream.write("Hello");
      stream.write("World");

      expect(stream.read()).toEqual("Hello");
    });
  });

  describe("#readAll", function() {
    it("should return an array of read lines", function() {
      stream.write("Hello");
      stream.write("World");

      expect(stream.readAll()).toEqual([ "Hello", "World" ]);
    })

    it("should return empty array if nothing is available", function() {
      expect(stream.readAll()).toEqual([ ]);
    });
  });
});
