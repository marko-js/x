export default (input => {
  _write(`Hello ${_xml(input.name)}! `);

  if (input.colors.length) {
    _write("<ul>");

    _loop(input.colors, color => {
      _write(`<li>${_xml(color)}</li>`);
    });

    _write("</ul>");
  } else {
    _write("<div>No colors!</div>");
  }
});
import { write as _write, xml as _xml } from "fluurt/html";
import { loop as _loop } from "fluurt";