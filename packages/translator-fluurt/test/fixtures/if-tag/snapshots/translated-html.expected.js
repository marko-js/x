export default (input => {
  if (a + b) {
    _write("Hello");
  }

  if (a, b) {
    _write("World");
  }

  _write("<div>");

  if (x) {
    _write("A");
  } else if (y) {
    _write("B");
  } else {
    _write("C");
  }

  _write("</div>");

  if (input.x) {
    _write("Hi Again");
  }
});
import { write as _write } from "fluurt/html";