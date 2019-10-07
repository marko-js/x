export default (input => {
  _write("<div id=\"shorthand\">");

  _write("</div>");

  _write(`<div${_attr("id", dynamic)}>`);

  _write("</div>");

  _write(`<div${_attr("id", "partial-" + dynamic)}>`);

  _write("</div>");
});
import { write as _write, attr as _attr } from "fluurt/html";