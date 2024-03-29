import { data as _data, bindRenderer as _bindRenderer, inChild as _inChild, value as _value, createRenderer as _createRenderer, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
import { setup as _customTag, attrs as _customTag_attrs, template as _customTag_template, walks as _customTag_walks } from "./components/custom-tag.marko";
const _count$customTagBody = /* @__PURE__ */_value("count", (_scope, count) => _data(_scope["#text/0"], count));
const _customTagBody = /* @__PURE__ */_createRenderer("<div>Count: <!></div>", /* next(1), over(1), replace */"Db%", void 0, void 0, void 0, void 0, void 0, void 0, (_scope, _destructure, _clean) => {
  let count;
  if (!_clean) ({
    value: [count]
  } = _destructure);
  _count$customTagBody(_scope, count, _clean);
});
const _setup = _scope => {
  _customTag(_scope["#childScope/0"]);
  _customTag_attrs(_scope["#childScope/0"], {
    renderBody: /* @__PURE__ */_bindRenderer(_scope, _customTagBody)
  });
};
export const template = `${_customTag_template}`;
export const walks = /* beginChild, _customTag_walks, endChild */`/${_customTag_walks}&`;
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/custom-tag-parameters/template.marko");