import tagA from "./components/tag-a/index.marko";
import tagB from "./components/tag-b/index.marko";
import { dynamicTag as _dynamicTag, attr as _attr, write as _write, markHydrateNode as _markHydrateNode, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  renderBody,
  x,
  show,
  showTagA,
  isLarge,
  tag,
  level,
  other
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _dynamicTag(renderBody, {
    class: ["a", "b"],
    other: other
  });
  _dynamicTag(x, {
    class: ["a", "b"],
    other: other
  });
  const _tagName = show ? "div" : null;
  if (_tagName) _write(`<${_tagName} class="a b"${_attr("other", other)}>`);
  if (_tagName) _write(`</${_tagName}>`);
  const _tagName2 = show && "div";
  _write(`${_markHydrateNode(_scope0_id, "#undefined/2")}`);
  if (_tagName2) _write(`<${_tagName2} class="a b"${_attr("other", other)}>`);
  if (_tagName2) _write(`</${_tagName2}>`);
  _write(`${_markHydrateNode(_scope0_id, "#undefined/3")}<${large ? "h1" : "h2"} class="a b"${_attr("other", other)}></${large ? "h1" : "h2"}>${_markHydrateNode(_scope0_id, "#undefined/4")}`);
  (showTagA ? tagA : tagB)({
    class: ["a", "b"],
    other: other,
    class: ["a", "b"],
    other: other,
    renderBody() {
      const _scope2_id = _nextScopeId();
    }
  });
  const _tagName3 = showTagA && tagA;
  function _renderBody2() {
    const _scope3_id = _nextScopeId();
  }
  if (_tagName3) _tagName3({
    class: ["a", "b"],
    other: other
  });else _renderBody2();
  const _tagName4 = showTagA && tagA;
  function _renderBody3() {
    const _scope1_id = _nextScopeId();
    _write("Body content");
  }
  if (_tagName4) _tagName4({
    class: ["a", "b"],
    other: other
  });else _renderBody3();
  (tag || tagA)({
    class: ["a", "b"],
    other: other,
    renderBody() {
      const _scope4_id = _nextScopeId();
    }
  });
  const largeHeading = isLarge && "h1";
  const _tagName5 = largeHeading || "h2";
  if (_tagName5) _write(`<${_tagName5} class="a b"${_attr("other", other)}>`);
  if (_tagName5) _write(`</${_tagName5}>`);
  const tagConstA = "a";
  const tagConstB = show ? "div" : null;
  _write(`${_markHydrateNode(_scope0_id, "#undefined/5")}<${global.x = "a" + "b"} class="a b"${_attr("other", other)}></${global.x = "a" + "b"}>${_markHydrateNode(_scope0_id, "#undefined/6")}<${"h" + level} class="a b"${_attr("other", other)}></${"h" + level}>${_markHydrateNode(_scope0_id, "#undefined/7")}<h${level} class="a b"${_attr("other", other)}></h${level}>${_markHydrateNode(_scope0_id, "#undefined/8")}<${tagConstA} class="a b"${_attr("other", other)}></${tagConstA}>${_markHydrateNode(_scope0_id, "#undefined/9")}`);
  if (tagConstB) _write(`<${tagConstB} class="a b"${_attr("other", other)}>`);
  if (tagConstB) _write(`</${tagConstB}>`);
<<<<<<< HEAD
  _write(`${_markHydrateNode(_scope0_, "#undefined/10")}`);
  _writeHydrateScope(_scope0_, {
    "#text/0": dynamicTagName,
    "#text/1": dynamicTagName,
    "other": other
  });
=======
  _write(`${_markHydrateNode(_scope0_id, "#undefined/10")}`);
>>>>>>> e11caa87 (fix(if-tag): undid Michael's changes from the last PR)
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);