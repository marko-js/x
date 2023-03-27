import { setup as _child, attrs as _child_attrs, template as _child_template, walks as _child_walks } from "./components/child.marko";
import { value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _x = /* @__PURE__ */_value("x", (_scope, x, _dirty) => {
  if (_dirty) {
    _child_attrs_value = {
      value: x
    };
  }
  var _child_attrs_value;
  _child_attrs(_scope["#childScope/1"], _child_attrs_value, _dirty);
});
const _setup = _scope => {
  _child(_scope["#childScope/0"]);
  _child(_scope["#childScope/1"]);
  _x(_scope, "y");
  _child_attrs(_scope["#childScope/0"], {
    value: 3
  });
};
export const template = `${_child_template}${_child_template}`;
export const walks = /* beginChild, _child_walks, endChild, beginChild, _child_walks, endChild */`/${_child_walks}&/${_child_walks}&`;
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/custom-tag-default-value/template.marko");