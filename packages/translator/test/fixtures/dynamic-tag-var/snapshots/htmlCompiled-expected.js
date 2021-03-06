import child from "./components/child/index.marko";
import { dynamicTag as _dynamicTag, hydrateMarker as _hydrateMarker, write as _write, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = _register("packages/translator/test/fixtures/dynamic-tag-var/template.marko", input => {
  const data1 = child();

  const _tagName = input.show && child;

  let data2 = void 0;
  if (_tagName) data2 = _tagName();

  const data3 = _dynamicTag(input.dynamic, null);

  const _tagName2 = input.show && "div";

  const el1 = void 0;
  if (_tagName2) _write(`${_hydrateMarker()}<${_tagName2}></${_tagName2}>`);
});

export default _renderer;
export const render = _createRenderer(_renderer);