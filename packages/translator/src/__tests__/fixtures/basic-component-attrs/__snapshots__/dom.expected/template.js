import { queueSource as _queueSource, inChild as _inChild, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
import { setup as _myButton, attrs as _myButton_attrs, template as _myButton_template, walks as _myButton_walks } from "./components/my-button.marko";
const _clickCount = /* @__PURE__ */_value("clickCount", (_scope, clickCount) => _myButton_attrs(_scope["#childScope/0"], {
  text: clickCount,
  onClick: function () {
    const {
      clickCount
    } = _scope;
    _queueSource(_scope, _clickCount, clickCount + 1);
  }
}), void 0, _inChild("#childScope/0", _myButton_attrs));
const _setup = _scope => {
  _myButton(_scope["#childScope/0"]);
  _clickCount(_scope, 0);
};
export const template = `${_myButton_template}`;
export const walks = /* beginChild, _myButton_walks, endChild */`/${_myButton_walks}&`;
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/basic-component-attrs/template.marko");