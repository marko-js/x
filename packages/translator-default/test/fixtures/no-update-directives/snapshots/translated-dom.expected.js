const _marko_template = _t2(__filename);

export default _marko_template;
import _hello from "./components/hello/index.marko";
import { t as _t } from "marko/src/runtime/dom/helpers";

const _hello_tag = _t(_hello);

import _noUpdate from "marko/src/core-tags/components/preserve-tag.js";

const _noUpdate_tag = _t(_noUpdate);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("ssDzNmTg", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _noUpdateKey = _component.___nextKey("0");

  _noUpdate_tag({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag(null, out, _component, "1");

          out.be("div", null, "2", component, 0, 0);
          out.ee();
        }
      }, out, _component, "0");
    }
  }, out, _component, `#${_noUpdateKey}`);

  const _noUpdateKey2 = _component.___nextKey("3");

  _noUpdate_tag({
    "cid": _noUpdateKey2,
    "if": x,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey3 = _component.___nextKey("4");

          _noUpdate_tag({
            "cid": _noUpdateKey3,
            "if": (a, b),
            "renderBody": out => {
              _hello_tag(null, out, _component, "4");
            }
          }, out, _component, `#${_noUpdateKey3}`);

          out.be("div", null, "5", component, 0, 0);
          out.ee();
        }
      }, out, _component, "3");
    }
  }, out, _component, `#${_noUpdateKey2}`);

  const _noUpdateKey4 = _component.___nextKey("6");

  _noUpdate_tag({
    "cid": _noUpdateKey4,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag(null, out, _component, "7");

          out.be("div", null, "8", component, 0, 0);
          out.ee();
        }
      }, out, _component, "6");
    }
  }, out, _component, `#${_noUpdateKey4}`);

  const _noUpdateKey5 = _component.___nextKey("9");

  _noUpdate_tag({
    "cid": _noUpdateKey5,
    "if": x,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey6 = _component.___nextKey("10");

          _noUpdate_tag({
            "cid": _noUpdateKey6,
            "if": (a, b),
            "bodyOnly": true,
            "renderBody": out => {
              _hello_tag({
                "renderBody": out => {
                  out.t("Again");
                }
              }, out, _component, "10");
            }
          }, out, _component, `#${_noUpdateKey6}`);

          out.be("div", null, "11", component, 0, 0);
          out.ee();
        }
      }, out, _component, "9");
    }
  }, out, _component, `#${_noUpdateKey5}`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko", "marko/src/core-tags/components/preserve-tag.js"]
};