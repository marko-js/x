export default (input => {
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
});
import { beginEl as _beginEl, get as _get, on as _on, endEl as _endEl } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";