export default (input => {
  out.w(`<div${_marko_attr("foo", `Hello ${input.name}`)}>`);
  out.w("</div>");
});
import { a as _marko_attr } from "marko/src/runtime/html/helpers";