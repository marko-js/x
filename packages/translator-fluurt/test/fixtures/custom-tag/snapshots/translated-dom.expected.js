export default (input => {
  _testHello_tag({
    "name": "World"
  });

  _testHello_tag({
    "name": Math.random()
  });

  _testHello_tag(input.attrs);
});
import _testHello_tag from "./components/test-hello/index.marko";