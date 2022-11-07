import { write as _write, data as _data, bindRenderer as _bindRenderer, setSource as _setSource, createRenderer as _createRenderer, notifySignal as _notifySignal, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
import { setup as _other, attrs as _other_attrs, template as _other_template, walks as _other_walks } from "./components/other.marko";
const _message$otherBody = "SIGNAL NOT INITIALIZED";

const _otherBody = /* @__PURE__ */_createRenderer(" </span>",
/* next(1), get */
"D ");

const _setup = _scope => {
  _other(_scope[0]);

  _setSource(_scope[0], _other_attrs, {
    renderBody: /* @__PURE__ */_bindRenderer(_scope, _otherBody)
  });

  _notifySignal(_scope, _other_attrs);
};

export const template = `${_other_template}`;
export const walks =
/* beginChild(0), _other_walks, endChild */
`/${_other_walks}&`;
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup);