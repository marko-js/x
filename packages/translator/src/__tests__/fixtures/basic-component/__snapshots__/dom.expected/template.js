import { setup as _counter, template as _counter_template, walks as _counter_walks } from "./components/counter.marko";
const _setup = _scope => {
  _counter(_scope["#childScope/0"]);
};
export const template = `<div>${_counter_template}</div>`;
export const walks = /* next(1), beginChild, _counter_walks, endChild, out(1) */`D/${_counter_walks}&l`;
export const setup = _setup;
import { createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/basic-component/template.marko");