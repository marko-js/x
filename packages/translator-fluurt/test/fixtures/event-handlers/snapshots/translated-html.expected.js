export default function _renderer(input) {
  _write("<div></div>");

  _customTag_tag({
    "onThing": ev => {
      console.log(ev);
    }
  });
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("dK4lSmxR", _renderer));

export { _render as render };
import _customTag_tag from "./components/custom-tag.marko";