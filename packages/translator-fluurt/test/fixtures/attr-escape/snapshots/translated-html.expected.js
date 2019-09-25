export default (input => {
  out.w(`<div${_marko_attr("class", _classAttr(input.className))}${_marko_attr("foo", 'a' + input.foo + 'b')}${_marko_attr("bar", `a ${input.foo} b`)}>`);
  out.w("</div>");
});
import { classAttr as _classAttr } from "fluurt";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";