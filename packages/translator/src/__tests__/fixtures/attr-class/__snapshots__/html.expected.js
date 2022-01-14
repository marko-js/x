import { markScopeOffset as _markScopeOffset, classAttr as _classAttr, write as _write, dynamicTag as _dynamicTag, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _customTag from "./components/custom-tag.marko";

const _renderer = _register("packages/translator/src/__tests__/fixtures/attr-class/template.marko", input => {
  const {
    c,
    d
  } = input;

  _write(`${_markScopeOffset(0)}<div${_classAttr(["a", {
    b: c,
    d
  }])}></div><div class="a b"></div><div class="a b c"></div>`);

  _customTag({
    class: ["a", {
      b: c,
      d
    }]
  });

  _customTag({
    class: ["a", false, "b"]
  });

  _dynamicTag(input.test, {
    class: ["a", {
      b: c,
      d
    }],
    test: {
      class: ["a", {
        b: c,
        d
      }],

      renderBody() {
        _write("Hello");
      }

    }
  });
});

export default _renderer;
export const render = _createRenderer(_renderer);