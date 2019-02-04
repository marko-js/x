import _hello from "./components/hello/index.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _hello_tag = _t(_hello);

import _noUpdate from "marko/src/components/taglib/preserve-tag.js";

const _noUpdate_tag = _t(_noUpdate);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "FaQWPoit";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  const _noUpdateKey4 = __component.___nextKey("3");

  const _noUpdateKey3 = __component.___nextKey("2");

  const _noUpdateKey2 = __component.___nextKey("1");

  const _noUpdateKey = __component.___nextKey("0");

  _noUpdate_tag({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "4");

          out.be("div", {}, "5", component, 0, 0);
          out.ee();
        }
      }, out, "6");
    }
  }, out, `#${_noUpdateKey}`)

  _noUpdate_tag({
    "cid": _noUpdateKey2,
    "if": x,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "7");

          out.be("div", {}, "8", component, 0, 0);
          out.ee();
        }
      }, out, "9");
    }
  }, out, `#${_noUpdateKey2}`)

  _noUpdate_tag({
    "cid": _noUpdateKey3,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "10");

          out.be("div", {}, "11", component, 0, 0);
          out.ee();
        }
      }, out, "12");
    }
  }, out, `#${_noUpdateKey3}`)

  _noUpdate_tag({
    "cid": _noUpdateKey4,
    "if": x,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "13");

          out.be("div", {}, "14", component, 0, 0);
          out.ee();
        }
      }, out, "15");
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