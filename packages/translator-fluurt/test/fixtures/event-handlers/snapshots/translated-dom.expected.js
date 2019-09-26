export default (input => {
  _beginEl("div");

  _dynamicOn("click", ev => {
    console.log(_get(ev));
  });

  _endEl();

  _customTag_tag({
    "onThing": _compute(() => ev => {
      console.log(_get(ev));
    })
  });
});
import { beginEl as _beginEl, get as _get, compute as _compute, dynamicOn as _dynamicOn, endEl as _endEl } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";