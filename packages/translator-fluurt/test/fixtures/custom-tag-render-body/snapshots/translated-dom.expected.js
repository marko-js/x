export default (input => {
  _testBodyFunction_tag({
    "name": "World",

    renderBody() {
      _text("This is the body content");
    }

  });
});
import { text as _text } from "fluurt";
import _testBodyFunction_tag from "./components/test-body-function/index.marko";