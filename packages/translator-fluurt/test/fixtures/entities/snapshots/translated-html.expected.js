export default (input => {
  _write("Hello John &amp; Suzy Invalid Entity: &b ; Valid Numeric Entity: &#34; Valid Hexadecimal Entity: &#x00A2;");
});
import { write as _write } from "fluurt/html";