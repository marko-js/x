export default (input => {
  _write("<!--");

  _write("test");

  _write("-->");
});
import { write as _write } from "fluurt/html";