export default (input => {
  _loop(arr, (val, i) => {
    _write("<div>");

    _write(_xml(i));

    _write(": ");

    _write(_xml(val));

    _write("</div>");
  });

  _loop(arr, (val, i, list) => {
    _write("<div>");

    _write(_xml(i));

    _write(" of ");

    _write(_xml(list.length));

    _write(": ");

    _write(_xml(val));

    _write("</div>");
  }, (val, i) => i);

  _loop([].concat(input.x, input.y), (val, i) => {
    _write("<div>");

    _write(_xml(i));

    _write(": ");

    _write(_xml(val));

    _write("</div>");
  }, memo(val => doCalc(val)));
});
import { xml as _xml, write as _write } from "fluurt/html";
import { loop as _loop } from "fluurt";