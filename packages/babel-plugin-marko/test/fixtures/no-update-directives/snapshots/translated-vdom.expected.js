import _hello from "./components/hello/index.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _hello_tag = _t(_hello);

import _noUpdate from "marko/src/components/taglib/preserve-tag.js";

const _noUpdate_tag = _t(_noUpdate);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "FaQWPoit";

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _noUpdateKey5 = _component.___nextKey("4");

  const _noUpdateKey4 = _component.___nextKey("3");

  const _noUpdateKey2 = _component.___nextKey("1");

  const _noUpdateKey = _component.___nextKey("0");

  _noUpdate_tag({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "6");

          out.be("div", null, "7", component, 0, 0);
          out.ee();
        }
      }, out, "8");
    }
  }, out, `#${_noUpdateKey}`)

  _noUpdate_tag({
    "cid": _noUpdateKey2,
    "if": x,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey3 = _component.___nextKey("2");

          _noUpdate_tag({
            "cid": _noUpdateKey3,
            "if": (a, b),
            "renderBody": out => {
              _hello_tag({}, out, "9");
            }
          }, out, `#${_noUpdateKey3}`);

          out.be("div", null, "10", component, 0, 0);
          out.ee();
        }
      }, out, "11");
    }
  }, out, `#${_noUpdateKey2}`)

  _noUpdate_tag({
    "cid": _noUpdateKey4,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "12");

          out.be("div", null, "13", component, 0, 0);
          out.ee();
        }
      }, out, "14");
    }
  }, out, `#${_noUpdateKey4}`)

  _noUpdate_tag({
    "cid": _noUpdateKey5,
    "if": x,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey6 = _component.___nextKey("5");

          _noUpdate_tag({
            "cid": _noUpdateKey6,
            "if": (a, b),
            "bodyOnly": true,
            "renderBody": out => {
              _hello_tag({
                "renderBody": out => {
                  out.t("Again");
                }
              }, out, "15");
            }
          }, out, `#${_noUpdateKey6}`);

          out.be("div", null, "16", component, 0, 0);
          out.ee();
        }
      }, out, "17");
    }
  }, out, `#${_noUpdateKey5}`)
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