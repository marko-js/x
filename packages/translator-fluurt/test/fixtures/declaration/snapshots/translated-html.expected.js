export default (input => {
  _write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");

  _write("<contact-info>");

  _write("<name>");

  _write("Hello World");

  _write("</name>");

  _write("</contact-info>");
});
import { write as _write } from "fluurt/html";