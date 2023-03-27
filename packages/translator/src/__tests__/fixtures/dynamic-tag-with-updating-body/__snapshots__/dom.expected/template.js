import { setup as _counter, template as _counter_template, walks as _counter_walks } from "./components/counter.marko";
import { dynamicTagAttrs as _dynamicTagAttrs, on as _on, queueSource as _queueSource, createRenderer as _createRenderer, conditional as _conditional, register as _register, queueHydrate as _queueHydrate, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _setup$tagNameBody = _scope => {
  _counter(_scope["#childScope/0"]);
};
const _tagNameBody = /* @__PURE__ */_createRenderer(`${_counter_template}`, /* beginChild, _counter_walks, endChild */`/${_counter_walks}&`, _setup$tagNameBody);
const _dynamicTagName = /* @__PURE__ */_conditional("#text/0", (_scope, _dirty) => {
  if (_dirty) {
    _dynamicBody_attrs = () => ({});
  }
  var _dynamicBody_attrs;
  _dynamicTagAttrs(_scope, "#text/0", _dynamicBody_attrs, _tagNameBody, _dirty);
});
const _hydrate_tagName = _register("packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko_0_tagName", _scope => _on(_scope["#button/1"], "click", function () {
  const tagName = _scope["tagName"];
  _queueSource(_scope, _tagName, tagName === "span" ? "div" : "span");
}));
const _tagName = /* @__PURE__ */_value("tagName", (_scope, tagName, _dirty) => {
  if (_dirty) {
    _dynamicTagName_value = tagName || _tagNameBody;
    _queueHydrate(_scope, _hydrate_tagName);
  }
  var _dynamicTagName_value;
  _dynamicTagName(_scope, _dynamicTagName_value, _dirty);
});
const _setup = _scope => {
  _tagName(_scope, "div");
};
export const template = "<!><button id=changeTag></button>";
export const walks = /* replace, over(1), get, over(1) */"%b b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko");