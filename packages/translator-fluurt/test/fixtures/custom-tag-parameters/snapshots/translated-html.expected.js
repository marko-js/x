export default (input => {
  _customTag_tag({
    renderBody(a, b, {
      c
    }) {
      _write(`<div>${_xml(a)} ${_xml(b)} ${_xml(c + input.d)}</div>`);
    }

  });
});
import { xml as _xml, write as _write } from "fluurt/html";
import _customTag_tag from "./components/custom-tag.marko";