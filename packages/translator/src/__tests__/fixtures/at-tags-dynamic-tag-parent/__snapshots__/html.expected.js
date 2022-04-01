import { write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = input => {
  <${x} header={
    class: "my-header",

    renderBody() {
      _write("Header content");
    }

  } footer={
    class: "my-footer",

    renderBody() {
      _write("Footer content");
    }

  }/>

  _write("Body content");

  const _scope = _nextScopeId();
};

export default _renderer;
export const render = _createRenderer(_renderer);