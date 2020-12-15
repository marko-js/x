import { escapeXML as _escapeXML, write as _write, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = _register("packages/translator/test/fixtures/tag-tag/template.marko", input => {
  const MyTag = input => _write(`Hello ${_escapeXML(input.name)}`);

  MyTag({
    name: "World"
  });
});

export default _renderer;
export const render = _createRenderer(_renderer);