import { escapeXML as _escapeXML, hydrateMarker as _hydrateMarker, toString as _toString, write as _write, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = _register("packages/translator/test/fixtures/placeholders/template.marko", input => {
  _write(`<div><div>a</div>${_hydrateMarker()}${_escapeXML(input.x)}Hello Text &lt;a/>${_hydrateMarker()}${_toString(input.x)}Hello HTML <a/><script>
    Hello &lt;b> &lt;/script>
  </script></div>`);
});

export default _renderer;
export const render = _createRenderer(_renderer);