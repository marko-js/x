import { data as _data, html as _html, write as _write, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";

function _apply() {
  _html(2, "Hello HTML <a/>");
}

function _apply_x(x) {
  if (_write(3, x)) {
    _data(0, x);

    _html(1, x);
  }
}

export const template = "<div><div>a</div><!>Hello Text &lt;a/><!><!><script>\n    Hello &lt;b> &lt;/script>\n  </script></div>";
export const walks = "Db%c%c%";
export const apply = _apply;
export default _createRenderFn(template, walks, apply);