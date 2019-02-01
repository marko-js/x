import _test from "./components/test.marko";
import { t as _t, d as _marko_dynamicTag } from "marko/src/runtime/html/helpers";

const _test_tag = _t(_test);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/html";

const _marko_template = _t2(__filename),
      _marko_componentType = "M5ooyXS3";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  const _dynamic_tag_renderBody = out => {
    out.w("<div>Hello World</div>");
  };

  const _test_tag_renderBody = out => {
    out.w("<div>Hello</div>");
  };

  if (!x) {
    out.w("<div>");
  }

  out.w("Hello")

  if (!x) {
    out.w("</div>");
  }

  if (x) {
    _marko_dynamicTag(_test_tag_renderBody, null, out, __component, "5");
  } else {
    _test_tag({
      "renderBody": _test_tag_renderBody
    }, out, "1");
  }

  if (x) {
    _marko_dynamicTag(_dynamic_tag_renderBody, null, out, __component, "6");
  } else {
    _marko_dynamicTag(test, {
      "renderBody": _dynamic_tag_renderBody
    }, out, __component, "3");
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/test.marko"]
}
export default _marko_template;