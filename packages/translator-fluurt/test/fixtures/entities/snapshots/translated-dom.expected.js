export default (input => {
  _text("Hello John & Suzy Invalid Entity: &b ; Valid Numeric Entity: \" Valid Hexadecimal Entity: \xA2");
});
import { text as _text } from "fluurt";