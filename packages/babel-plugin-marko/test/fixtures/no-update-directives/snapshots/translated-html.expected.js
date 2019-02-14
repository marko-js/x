import _noUpdate from "marko/src/components/taglib/preserve-tag.js";
import { t as _t } from "marko/src/runtime/html/helpers";

const _noUpdate_tag = _t(_noUpdate);

import _hello from "./components/hello/index.marko";

const _hello_tag = _t(_hello);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/html";

const _marko_componentType = "FaQWPoit",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _noUpdateKey = _component.___nextKey("0");

  _noUpdate_tag({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "1");

          out.w("<div></div>");
        }
      }, out, "3");
    }
  }, out, `#${_noUpdateKey}`);

  const _noUpdateKey2 = _component.___nextKey("4");

  _noUpdate_tag({
    "cid": _noUpdateKey2,
    "if": x,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey3 = _component.___nextKey("5");

          _noUpdate_tag({
            "cid": _noUpdateKey3,
            "if": (a, b),
            "renderBody": out => {
              _hello_tag({}, out, "6");
            }
          }, out, `#${_noUpdateKey3}`);

          out.w("<div></div>");
        }
      }, out, "8");
    }
  }, out, `#${_noUpdateKey2}`);

  const _noUpdateKey4 = _component.___nextKey("9");

  _noUpdate_tag({
    "cid": _noUpdateKey4,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, "10");

          out.w("<div></div>");
        }
      }, out, "12");
    }
  }, out, `#${_noUpdateKey4}`);

  const _noUpdateKey5 = _component.___nextKey("13");

  _noUpdate_tag({
    "cid": _noUpdateKey5,
    "if": x,
    "bodyOnly": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey6 = _component.___nextKey("14");

          _noUpdate_tag({
            "cid": _noUpdateKey6,
            "if": (a, b),
            "bodyOnly": true,
            "renderBody": out => {
              _hello_tag({
                "renderBody": out => {
                  out.w("Again");
                }
              }, out, "15");
            }
          }, out, `#${_noUpdateKey6}`);

          out.w("<div></div>");
        }
      }, out, "17");
    }
  }, out, `#${_noUpdateKey5}`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["marko/src/components/taglib/preserve-tag.js", "./components/hello/index.marko"]
};
export default _marko_template;