export default (input => {
  _write(`<div id="shorthand"></div><div${_attr("id", dynamic)}></div><div${_attr("id", "partial-" + dynamic)}></div>`);
});
import { write as _write, attr as _attr } from "fluurt/html";