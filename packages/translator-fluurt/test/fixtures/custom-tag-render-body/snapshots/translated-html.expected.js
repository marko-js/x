export default (input => {
  _testBodyFunction_tag({
    "name": "World",

    renderBody() {
      _write("This is the body content");
    }

  });
});
import { write as _write } from "fluurt/html";
import _testBodyFunction_tag from "./components/test-body-function/index.marko";