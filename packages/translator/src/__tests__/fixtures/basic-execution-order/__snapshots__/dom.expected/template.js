import { setSource as _setSource, queueSource as _queueSource, on as _on, data as _data, inConditionalScope as _inConditionalScope, closure as _closure, createRenderer as _createRenderer, conditional as _conditional, source as _source, register as _register, queueHydrate as _queueHydrate, bind as _bind, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";

const _message$ifBody = /* @__PURE__ */_closure(1, 7, [], (_scope, message) => _data(_scope[0], message.text));

const _ifBody = /* @__PURE__ */_createRenderer(" ",
/* get */
" ", null, [_message$ifBody]);

const _if = /* @__PURE__ */_conditional(1, 1, (_scope, show = _scope[8]) => show ? _ifBody : null);

const _show = /* @__PURE__ */_source(8, [_if]);

const _message = /* @__PURE__ */_source(7, [/* @__PURE__ */_inConditionalScope(_message$ifBody, 1)]);

const _temp3 = function (_scope) {
  _queueSource(_scope, _message, null);

  _queueSource(_scope, _show, false);
};

const _hydrate_setup = _register("packages/translator/src/__tests__/fixtures/basic-execution-order/template.marko_0", _scope => _on(_scope[0], "click", /* @__PURE__ */_bind(_scope, _temp3)));

const _setup = _scope => {
  _setSource(_scope, _message, {
    text: "hi"
  });

  _setSource(_scope, _show, true);

  _queueHydrate(_scope, _hydrate_setup);
};

export const template = "<button>hide</button><!>";
export const walks =
/* get, over(1), replace, skip(5), over(1) */
" b%-b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup);