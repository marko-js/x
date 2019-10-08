export default (input => {
  _write(`<div a="1" b="2"${_attr("c", input.c)}${_attr("d", input.d())} e="3"${_attr("f", 1 + input.f)}${_attr("g", input.a.b.c + d)}${_attr("h", Math.abc.ok())}></div>`);
});
import { attr as _attr, write as _write } from "fluurt/html";