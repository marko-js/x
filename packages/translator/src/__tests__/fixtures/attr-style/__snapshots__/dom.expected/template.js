import { styleAttr as _styleAttr, write as _write, createRenderer as _createRenderer, conditional as _conditional, source as _source, setSource as _setSource, destructureSources as _destructureSources, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
import { setup as _customTag, template as _customTag_template, walks as _customTag_walks } from "./components/custom-tag.marko";
const _testBody = /* @__PURE__ */_createRenderer("", "");
const _dynamicTagName = /* @__PURE__ */_conditional("#text/4", 1, (_scope, test = _scope["test"]) => test);
const _test = /* @__PURE__ */_source("test", [_dynamicTagName]);
const _color = /* @__PURE__ */_source("color", [], (_scope, color) => _styleAttr(_scope["#div/0"], {
  color: color
}));
const _setup = _scope => {
  _customTag(_scope["#childScope/1"]);
  _customTag(_scope["#childScope/2"]);
  _customTag(_scope["#childScope/3"]);
};
export const attrs = /* @__PURE__ */_destructureSources([_color, _test], (_scope, {
  color,
  test
}) => {
  _setSource(_scope, _color, color);
  _setSource(_scope, _test, test);
});
export { _color as _apply_color, _test as _apply_test };
export const template = `<div></div><div style=width:100px></div><div style="color: green"></div>${_customTag_template}${_customTag_template}${_customTag_template}<!>`;
export const walks = /* get, over(3), beginChild(1), _customTag_walks, endChild, beginChild(2), _customTag_walks, endChild, beginChild(3), _customTag_walks, endChild, replace, over(1) */` d0${_customTag_walks}&1${_customTag_walks}&2${_customTag_walks}&%b`;
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs);