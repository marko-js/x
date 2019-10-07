export default (input => {
  _write("Hello ");

  _write(_xml(input.name));

  _write("! Hello ");

  _write(input.name);

  _write("! Hello ");

  _write(input.missing);

  _write("!");
});
import { write as _write, xml as _xml } from "fluurt/html";