export default (input => {
  _write("<div>");

  _write("<!--");

  _write("abc");

  _write("-->");

  _write("<!--[if lt IE 9]><script src=\"...\"></script><![endif]-->");

  _write("<!--");

  _write("[if lt IE 9]><script src=\"...\"></script><![endif]");

  _write("-->");

  _write("</div>");
});
import { write as _write } from "fluurt/html";