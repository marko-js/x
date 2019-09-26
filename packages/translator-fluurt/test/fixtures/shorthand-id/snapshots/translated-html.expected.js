export default (input => {
  out.w("<div id=\"shorthand\">");
  out.w("</div>");
  out.w(`<div${_marko_attr("id", dynamic)}>`);
  out.w("</div>");
  out.w(`<div${_marko_attr("id", "partial-" + dynamic)}>`);
  out.w("</div>");
});
import { a as _marko_attr } from "marko/src/runtime/html/helpers";