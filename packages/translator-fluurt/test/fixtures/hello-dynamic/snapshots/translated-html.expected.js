export default (input => {
  out.w("Hello ");
  out.w(_marko_escapeXml(input.name));
  out.w("! Hello ");
  out.w(input.name);
  out.w("! Hello ");
  out.w(input.missing);
  out.w("!");
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";