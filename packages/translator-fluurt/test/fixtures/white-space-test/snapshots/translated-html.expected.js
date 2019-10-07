export default (input => {
  _write("<div>");

  _write("<div>");

  _write("Hello ");

  _write("<div>");

  _write(" ");

  _write("</div>");

  _write(" World");

  _write("</div>");

  _write("<div>");

  _write(" Hello");

  _write("</div>");

  _write("<pre>");

  _write("\n    This should  \n      be preserved\n  ");

  _write("</pre>");

  _write("<div>");

  _write("<div>");

  _write("Hello ");

  _write("</div>");

  _write("</div>");

  _write("</div>");

  _write("<div>");

  _write("Hello ");

  _write("World ");

  _write("</div>");

  _write(" Hello World! ");

  _write(_xml(a));

  _write(_xml(b));

  _write("<div>");

  _write("</div>");
});
import { write as _write, xml as _xml } from "fluurt/html";