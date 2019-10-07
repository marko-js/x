export default (input => {
  _customTag_tag({
    renderBody(a, b, {
      c
    }) {
      _write("<div>");

      _write(_xml(a));

      _write(" ");

      _write(_xml(b));

      _write(" ");

      _write(_xml(c + input.d));

      _write("</div>");
    }

  });
});
import { xml as _xml, write as _write } from "fluurt/html";
import _customTag_tag from "./components/custom-tag.marko";