import { data as _data, html as _html, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _input = /* @__PURE__ */_value("input", (_scope, input) => {
  _data(_scope["#text/0"], input.x);
  _data(_scope["#text/1"], input.x);
  _data(_scope["#text/2"], input.x);
  _html(_scope, input.x, "#text/3");
});
const _setup = _scope => {
  _html(_scope, "Hello HTML <a/>", "#text/4");
};
export const attrs = _input;
export { _input };
export const template = "<!><span> <div></div></span><div><div>a</div><!>Hello Text &lt;a/><!><!><script>\n    Hello &lt;b> &lt;/script>\n  </script></div>";
export const walks = /* replace, over(1), next(1), get, out(1), next(1), over(1), replace, over(2), replace, over(2), replace, out(1) */"%bD lDb%c%c%l";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, void 0, "packages/translator/src/__tests__/fixtures/placeholders/template.marko");