export default (input => {
  _write(`<div><div>Hello <div> </div> World</div><div> Hello</div><pre>\n    This should  \n      be preserved\n  </pre><div><div>Hello </div></div></div><div>Hello World </div> Hello World! ${_xml(a)}${_xml(b)}<div></div>`);
});
import { write as _write, xml as _xml } from "fluurt/html";