export default (input => {
  _write("Hello ");

  _write(_xml(input.name));

  _write("! ");

  const _ifBranch = () => {
    _write("<ul>");

    _loop(input.colors, color => {
      _write("<li>");

      _write(_xml(color));

      _write("</li>");
    });

    _write("</ul>");
  };

  const _ifBranch2 = () => {
    _write("<div>");

    _write("No colors!");

    _write("</div>");
  };

  _conditional(input.colors.length ? _ifBranch : _ifBranch2);
});
import { write as _write, xml as _xml } from "fluurt/html";
import { loop as _loop, conditional as _conditional } from "fluurt";