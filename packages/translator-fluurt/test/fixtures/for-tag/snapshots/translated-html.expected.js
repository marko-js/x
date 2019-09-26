export default (input => {
  _loop(arr, (val, i) => {
    out.w("<div>");
    out.w(_marko_escapeXml(i));
    out.w(": ");
    out.w(_marko_escapeXml(val));
    out.w("</div>");
  });

  _loop(arr, (val, i, list) => {
    out.w("<div>");
    out.w(_marko_escapeXml(i));
    out.w(" of ");
    out.w(_marko_escapeXml(list.length));
    out.w(": ");
    out.w(_marko_escapeXml(val));
    out.w("</div>");
  }, (val, i) => i);

  _loop([].concat(input.x, input.y), (val, i) => {
    out.w("<div>");
    out.w(_marko_escapeXml(i));
    out.w(": ");
    out.w(_marko_escapeXml(val));
    out.w("</div>");
  }, memo(val => doCalc(val)));
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import { loop as _loop } from "fluurt";