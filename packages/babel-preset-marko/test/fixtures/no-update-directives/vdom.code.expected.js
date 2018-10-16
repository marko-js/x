import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _noUpdate from "marko/src/components/taglib/preserve-tag.js";
import _hello from "./components/hello/index.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "BYkk-0PY";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  const _noUpdateKey4 = __component.___nextKey("12");

  const _noUpdateKey3 = __component.___nextKey("8");

  const _noUpdateKey2 = __component.___nextKey("4");

  const _noUpdateKey = __component.___nextKey("0");

  _noUpdate({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello({
        "renderBody": out => {
          _hello(null, out, "2");

          out.be("div", null, "3", component, 0, 0);
          out.ee();
        }
      }, out, "1");
    }
  }, out, `#${_noUpdateKey}`)

  _noUpdate({
    "cid": _noUpdateKey2,
    "if": x,
    "renderBody": out => {
      _hello({
        "renderBody": out => {
          _hello(null, out, "6");

          out.be("div", null, "7", component, 0, 0);
          out.ee();
        }
      }, out, "5");
    }
  }, out, `#${_noUpdateKey2}`)

  _noUpdate({
    "cid": _noUpdateKey3,
    "bodyOnly": true,
    "renderBody": out => {
      _hello({
        "renderBody": out => {
          _hello(null, out, "10");

          out.be("div", null, "11", component, 0, 0);
          out.ee();
        }
      }, out, "9");
    }
  }, out, `#${_noUpdateKey3}`)

  _noUpdate({
    "cid": _noUpdateKey4,
    "if": x,
    "bodyOnly": true,
    "renderBody": out => {
      _hello({
        "renderBody": out => {
          _hello(null, out, "14");

          out.be("div", null, "15", component, 0, 0);
          out.ee();
        }
      }, out, "13");
    }
  }, out, `#${_noUpdateKey4}`)
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko", "marko/src/components/taglib/preserve-tag.js"]
}
export default _marko_template;