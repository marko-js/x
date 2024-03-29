import { setup as _child, template as _child_template, walks as _child_walks } from "./components/child.marko";
const _setup = _scope => {
  _child(_scope["#childScope/0"]);
};
export const template = `${_child_template}`;
export const walks = /* beginChild, _child_walks, endChild */`/${_child_walks}&`;
export const setup = _setup;
import { createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/return-tag-no-var/template.marko");