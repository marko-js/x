export default (input => {
  _customTag_tag({
    renderBody: (a, b, {
      c
    }) => {
      out.w("<div>");
      out.w(_marko_escapeXml(a));
      out.w(" ");
      out.w(_marko_escapeXml(b));
      out.w(" ");
      out.w(_marko_escapeXml(c + input.d));
      out.w("</div>");
    }
  });
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import _customTag_tag from "./components/custom-tag.marko";