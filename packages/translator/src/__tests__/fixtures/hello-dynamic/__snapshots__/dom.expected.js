import { data as _data, html as _html, write as _write, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";

function _apply_name(name) {
  if (_write(3, name)) {
    _data(0, name);

    _html(1, name);
  }
}

function _apply_missing(missing) {
  if (_write(4, missing)) _html(2, missing);
}

export const template = "Hello <!>! Hello <!>! Hello <!>!";
export const walks = "b%c%c%";
export const apply = _apply_name;
export default _createRenderFn(template, walks, apply);