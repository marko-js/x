export default (input => {
  _write(`Hello ${_xml(input.name)}! Hello ${input.name}! Hello ${input.missing}!`);
});
import { write as _write, xml as _xml } from "fluurt/html";