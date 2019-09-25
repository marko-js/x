export default (input => {
  _customTag_tag({
    "renderBody": _compute(() => (a, b, {
      c
    }) => {
      out.w("<div>");
      out.w(_marko_escapeXml(_get(a)));
      out.w(" ");
      out.w(_marko_escapeXml(_get(b)));
      out.w(" ");
      out.w(_marko_escapeXml(_get(c)));
      out.w("</div>");
    })
  });
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import _customTag_tag from "./components/custom-tag.marko";
import { get as _get, compute as _compute } from "fluurt";