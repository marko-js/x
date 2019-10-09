export default function _renderer(input) {
  _beginEl("div");

  _on("click", ev => {
    console.log(_get(ev));
  });

  _endEl();

  _customTag_tag({
    "onThing": ev => {
      console.log(_get(ev));
    }
  });
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, get as _get, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("dK4lSmxR", _renderer));

export { _render as render };
import { on as _on } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";