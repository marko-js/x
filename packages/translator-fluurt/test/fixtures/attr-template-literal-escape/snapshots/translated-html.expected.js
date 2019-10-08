export default (input => {
  _write(`<div${_attr("foo", `Hello ${input.name}`)}></div>`);
});
import { attr as _attr, write as _write } from "fluurt/html";