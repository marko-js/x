import { setup as _hello, attrs as _hello_attrs, template as _hello_template, walks as _hello_walks } from "./hello.marko";
import { inChild as _inChild, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _setup = _scope => {
  _hello(_scope["#childScope/0"]);
  _hello_attrs(_scope["#childScope/0"], {
    name: "Frank"
  });
};
export const template = `${_hello_template}`;
export const walks = /* beginChild, _hello_walks, endChild */`/${_hello_walks}&`;
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/custom-tag-template/template.marko");