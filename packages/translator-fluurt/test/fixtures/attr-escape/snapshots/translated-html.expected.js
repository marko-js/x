export default (input => {
  _write(`<div${_attr("class", _classAttr(input.className))}${_attr("foo", 'a' + input.foo + 'b')}${_attr("bar", `a ${input.foo} b`)}>`);

  _write("</div>");
});
import { classAttr as _classAttr } from "fluurt";
import { attr as _attr, write as _write } from "fluurt/html";