export default (input => {
  _write("<?xml version=\"1.0\" encoding=\"utf-8\"?><contact-info><name>Hello World</name></contact-info>");
});
import { write as _write } from "fluurt/html";