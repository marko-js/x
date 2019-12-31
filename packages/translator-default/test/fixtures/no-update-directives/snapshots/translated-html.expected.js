const _marko_template = _t(__filename);

export default _marko_template;
import _hello from "./components/hello/index.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _hello_tag = _marko_load_tag(_hello);

import _noUpdate from "../../../../marko/src/core-tags/components/preserve-tag.js";

const _noUpdate_tag = _marko_load_tag(_noUpdate);

import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "ssDzNmTg",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _noUpdateKey = _component.___nextKey("0");

  _noUpdate_tag({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag(null, out, _component, "1");

          out.w("<div></div>");
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

          out.w("<div></div>");
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

          out.w("<div></div>");
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
                  out.w("Again");
                }
              }, out, _component, "10");
            }
          }, out, _component, `#${_noUpdateKey6}`);

          out.w("<div></div>");
        }
      }, out, _component, "9");
    }
  }, out, _component, `#${_noUpdateKey5}`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko", "../../../../marko/src/core-tags/components/preserve-tag.js"]
};