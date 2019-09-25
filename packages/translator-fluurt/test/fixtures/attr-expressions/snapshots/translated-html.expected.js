export default (input => {
  out.w(`<div a="1" b="2"${_marko_attr("c", input.c)}${_marko_attr("d", input.d())} e="3"${_marko_attr("f", 1 + input.f)}${_marko_attr("g", input.a.b.c + d)}${_marko_attr("h", Math.abc.ok())}>`);
  out.w("</div>");
});
import { a as _marko_attr } from "marko/src/runtime/html/helpers";