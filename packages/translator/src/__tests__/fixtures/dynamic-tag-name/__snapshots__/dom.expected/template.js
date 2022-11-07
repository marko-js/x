import tagA from "./components/tag-a/index.marko";
import tagB from "./components/tag-b/index.marko";
import { createRenderer as _createRenderer, conditional as _conditional, derivation as _derivation, source as _source, notifySignal as _notifySignal, setSource as _setSource, destructureSources as _destructureSources, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";

const _dynamicBody2 = /* @__PURE__ */_createRenderer("Body content", "");

const _dynamicTagName15 = /* @__PURE__ */_conditional(84, 1, (_scope, tagConstB = _scope[100]) => tagConstB);

const _dynamicTagName14 = /* @__PURE__ */_conditional(78, 1, (_scope, tagConstA = _scope[99]) => tagConstA);

const _dynamicTagName13 = /* @__PURE__ */_conditional(72, 1, (_scope, level = _scope[96]) => `h${level}`);

const _dynamicTagName12 = /* @__PURE__ */_conditional(66, 1, (_scope, level = _scope[96]) => "h" + level);

const _dynamicTagName11 = /* @__PURE__ */_conditional(60, 1, _scope => global.x = "a" + "b");

const _dynamicTagName10 = /* @__PURE__ */_conditional(54, 1, (_scope, largeHeading = _scope[98]) => largeHeading || "h2");

const _dynamicTagName9 = /* @__PURE__ */_conditional(48, 1, (_scope, tag = _scope[95]) => tag || tagA);

const _dynamicTagName8 = /* @__PURE__ */_conditional(42, 1, (_scope, showTagA = _scope[93]) => showTagA && tagA);

const _dynamicTagName7 = /* @__PURE__ */_conditional(36, 1, (_scope, showTagA = _scope[93]) => showTagA && tagA);

const _dynamicTagName6 = /* @__PURE__ */_conditional(30, 1, (_scope, showTagA = _scope[93]) => showTagA ? tagA : tagB);

const _dynamicTagName5 = /* @__PURE__ */_conditional(24, 1, _scope => large ? "h1" : "h2");

const _dynamicTagName4 = /* @__PURE__ */_conditional(18, 1, (_scope, show = _scope[92]) => show && "div");

const _dynamicTagName3 = /* @__PURE__ */_conditional(12, 1, (_scope, show = _scope[92]) => show ? "div" : null);

const _dynamicTagName2 = /* @__PURE__ */_conditional(6, 1, (_scope, x = _scope[91]) => x);

const _dynamicTagName = /* @__PURE__ */_conditional(0, 1, (_scope, renderBody = _scope[90]) => renderBody);

const _tagConstB = /* @__PURE__ */_derivation(100, 1, [_dynamicTagName15], (_scope, show = _scope[92]) => show ? "div" : null);

const _tagConstA = /* @__PURE__ */_derivation(99, 1, [_dynamicTagName14], _scope => "a");

const _largeHeading = /* @__PURE__ */_derivation(98, 1, [_dynamicTagName10], (_scope, isLarge = _scope[94]) => isLarge && "h1");

const _other = /* @__PURE__ */_source(97, []);

const _level = /* @__PURE__ */_source(96, [_dynamicTagName12, _dynamicTagName13]);

const _tag = /* @__PURE__ */_source(95, [_dynamicTagName9]);

const _isLarge = /* @__PURE__ */_source(94, [_largeHeading]);

const _showTagA = /* @__PURE__ */_source(93, [_dynamicTagName6, _dynamicTagName7, _dynamicTagName8]);

const _show = /* @__PURE__ */_source(92, [_dynamicTagName3, _dynamicTagName4, _tagConstB]);

const _x = /* @__PURE__ */_source(91, [_dynamicTagName2]);

const _renderBody = /* @__PURE__ */_source(90, [_dynamicTagName]);

const _setup = _scope => {
  _notifySignal(_scope, _dynamicTagName5);

  _notifySignal(_scope, _dynamicTagName11);

  _notifySignal(_scope, _tagConstA);
};

export const attrs = /* @__PURE__ */_destructureSources([_renderBody, _x, _show, _showTagA, _isLarge, _tag, _level, _other], (_scope, {
  renderBody,
  x,
  show,
  showTagA,
  isLarge,
  tag,
  level,
  other
}) => {
  _setSource(_scope, _renderBody, renderBody);

  _setSource(_scope, _x, x);

  _setSource(_scope, _show, show);

  _setSource(_scope, _showTagA, showTagA);

  _setSource(_scope, _isLarge, isLarge);

  _setSource(_scope, _tag, tag);

  _setSource(_scope, _level, level);

  _setSource(_scope, _other, other);
});
export { _renderBody as _apply_renderBody, _x as _apply_x, _show as _apply_show, _showTagA as _apply_showTagA, _isLarge as _apply_isLarge, _tag as _apply_tag, _level as _apply_level, _other as _apply_other };
export const template = "<!><!><!><!><!><!><!><!><!><!><!><!><!><!><!>";
export const walks =
/* replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1) */
"%-b%-b%-b%-b%-b%-b%-b%-b%-b%-b%-b%-b%-b%-b%-b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs);