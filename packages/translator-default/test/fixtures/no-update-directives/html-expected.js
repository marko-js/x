/*Compiled using marko@5.0.0 - DO NOT EDIT*/
const _marko_template = _t(__filename);

export default _marko_template;
import _hello from "./components/hello/index.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _hello_tag = _marko_load_tag(_hello);

import _noUpdate from "../../../../marko/src/core-tags/components/preserve-tag.js";

const _noUpdate_tag = _marko_load_tag(_noUpdate);

import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "ssDzNmTg",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _noUpdateKey = _component.nk("0");

  _noUpdate_tag({
    "component": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          _hello_tag({}, out, _component, "1");

          out.w("<div></div>");
        }
      }, out, _component, _noUpdateKey);
    }
  }, out, _component, _noUpdateKey);

  const _noUpdateKey3 = _component.nk("3");

  _noUpdate_tag({
    "if": x,
    "component": true,
    "renderBody": out => {
      _hello_tag({
        "renderBody": out => {
          const _noUpdateKey2 = _component.nk("4");

          _noUpdate_tag({
            "if": (a, b),
            "component": true,
            "renderBody": out => {
              _hello_tag({}, out, _component, _noUpdateKey2);
            }
          }, out, _component, _noUpdateKey2);

          out.w("<div></div>");
        }
      }, out, _component, _noUpdateKey3);
    }
  }, out, _component, _noUpdateKey3);

  const _noUpdateKey4 = _component.nk("6");

  _noUpdate_tag({
    "component": true,
    "renderBody": out => {
      _hello_tag({}, out, _component, "7");

      out.w("<div></div>");
    }
  }, out, _component, _noUpdateKey4);

  const _noUpdateKey6 = _component.nk("9");

  _noUpdate_tag({
    "if": x,
    "component": true,
    "renderBody": out => {
      const _noUpdateKey5 = _component.nk("10");

      _noUpdate_tag({
        "if": (a, b),
        "component": true,
        "renderBody": out => {
          out.w("Again");
        }
      }, out, _component, _noUpdateKey5);

      out.w("<div></div>");
    }
  }, out, _component, _noUpdateKey6);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);

/*Compiled using marko@5.0.0 - DO NOT EDIT*/
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko", "../../../../marko/src/core-tags/components/preserve-tag.js"]
};