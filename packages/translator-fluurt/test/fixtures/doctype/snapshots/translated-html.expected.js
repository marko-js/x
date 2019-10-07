export default (input => {
  _write("<!DOCTYPE html>");

  _write("<html>");

  _write("<head>");

  _write("<title>");

  _write("Title of the document");

  _write("</title>");

  _write("</head>");

  _write("<body>");

  _write("The content of the document......");

  _write("</body>");

  _write("</html>");
});
import { write as _write } from "fluurt/html";