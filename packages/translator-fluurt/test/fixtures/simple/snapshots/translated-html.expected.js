export default (input => {
  out.w("Hello ");
  out.w(_marko_escapeXml(input.name));
  out.w("! ");

  const _ifBranch = () => {
    out.w("<ul>");

    _loop(input.colors, color => {
      out.w("<li>");
      out.w(_marko_escapeXml(color));
      out.w("</li>");
    });

    out.w("</ul>");
  };

  const _ifBranch2 = () => {
    out.w("<div>");
    out.w("No colors!");
    out.w("</div>");
  };

  _conditional(input.colors.length ? _ifBranch : _ifBranch2);
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import { loop as _loop, conditional as _conditional } from "fluurt";