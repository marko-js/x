import { escapeXML as _escapeXML, toString as _toString, write as _write, wrapHydratable as _wrapHydratable, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = _wrapHydratable("packages/translator/test/fixtures/hello-dynamic/template.marko", input => {
  _write(`Hello ${_escapeXML(input.name)}! Hello ${_toString(input.name)}! Hello ${_toString(input.missing)}!`);
});

export default _renderer;
export const render = _createRenderer(_renderer);