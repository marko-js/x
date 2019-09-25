export default (input => {
  _testBodyFunction_tag({
    "name": "World",

    renderBody() {
      out.w("This is the body content");
    }

  });
});
import _testBodyFunction_tag from "./components/test-body-function/index.marko";