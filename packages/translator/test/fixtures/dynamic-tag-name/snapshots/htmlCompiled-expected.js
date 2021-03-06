import tagA from "./components/tag-a/index.marko";
import tagB from "./components/tag-b/index.marko";
import { dynamicTag as _dynamicTag, hydrateMarker as _hydrateMarker, attr as _attr, write as _write, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = _register("packages/translator/test/fixtures/dynamic-tag-name/template.marko", input => {
  _dynamicTag(input.renderBody, {
    class: ["a", "b"],
    other: input.other
  });

  _dynamicTag(input.x, {
    class: ["a", "b"],
    other: input.other
  });

  const _tagName = input.show ? "div" : null;

  if (_tagName) _write(`${_hydrateMarker()}<${_tagName} class="a b"${_attr("other", input.other)}></${_tagName}>`);

  const _tagName2 = input.show && "div";

  if (_tagName2) _write(`${_hydrateMarker()}<${_tagName2} class="a b"${_attr("other", input.other)}></${_tagName2}>`);

  _write(`${_hydrateMarker()}<${input.large ? "h1" : "h2"} class="a b"${_attr("other", input.other)}></${input.large ? "h1" : "h2"}>`);

  (input.showTagA ? tagA : tagB)({
    class: ["a", "b"],
    other: input.other,
    class: ["a", "b"],
    other: input.other
  });

  const _tagName3 = input.showTagA && tagA;

  if (_tagName3) _tagName3({
    class: ["a", "b"],
    other: input.other
  });

  const _tagName4 = input.showTagA && tagA;

  function _renderBody() {
    _write("Body content");
  }

  if (_tagName4) _tagName4({
    class: ["a", "b"],
    other: input.other
  });else _renderBody();

  _dynamicTag(input.tag || tagA, {
    class: ["a", "b"],
    other: input.other
  });

  const largeHeading = input.isLarge && "h1";

  const _tagName5 = largeHeading || "h2";

  if (_tagName5) _write(`${_hydrateMarker()}<${_tagName5} class="a b"${_attr("other", input.other)}></${_tagName5}>`);
  const tagConstA = "a";
  const tagConstB = input.show ? "div" : null;

  _write(`${_hydrateMarker()}<${global.x = "a" + "b"} class="a b"${_attr("other", input.other)}></${global.x = "a" + "b"}>${_hydrateMarker()}<${"h" + input.level} class="a b"${_attr("other", input.other)}></${"h" + input.level}>${_hydrateMarker()}<h${input.level} class="a b"${_attr("other", input.other)}></h${input.level}>${_hydrateMarker()}<${tagConstA} class="a b"${_attr("other", input.other)}></${tagConstA}>`);

  if (tagConstB) _write(`${_hydrateMarker()}<${tagConstB} class="a b"${_attr("other", input.other)}></${tagConstB}>`);
});

export default _renderer;
export const render = _createRenderer(_renderer);