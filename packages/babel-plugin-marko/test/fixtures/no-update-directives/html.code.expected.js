import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _noUpdate from "marko/src/components/taglib/preserve-tag.js";

const _noUpdate2 = _t(_noUpdate);

import { t as _t } from "marko/src/runtime/html";
import _hello from "./components/hello/index.marko";

const _noUpdate3 = _t(_noUpdate);

const _noUpdate4 = _t(_noUpdate);

const _noUpdate5 = _t(_noUpdate);

const _marko_template = _t(__filename),
      _marko_componentType = "FaQWPoit";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  const _noUpdateKey4 = __component.___nextKey("12");

  const _noUpdateKey3 = __component.___nextKey("8");

  const _noUpdateKey2 = __component.___nextKey("4");

  const _noUpdateKey = __component.___nextKey("0");

  _noUpdate2({
    "cid": _noUpdateKey,
    "renderBody": out => {
      const _hello3 = _t(_hello);

      _hello3({
        "renderBody": out => {
          const _hello2 = _t(_hello);

          _hello2(null, out, "2");

          out.w("<div></div>");
        }
      }, out, "1");
    }
  }, out, `#${_noUpdateKey}`)

  _noUpdate3({
    "cid": _noUpdateKey2,
    "if": x,
    "renderBody": out => {
      const _hello5 = _t(_hello);

      _hello5({
        "renderBody": out => {
          const _hello4 = _t(_hello);

          _hello4(null, out, "6");

          out.w("<div></div>");
        }
      }, out, "5");
    }
  }, out, `#${_noUpdateKey2}`)

  _noUpdate4({
    "cid": _noUpdateKey3,
    "bodyOnly": true,
    "renderBody": out => {
      const _hello7 = _t(_hello);

      _hello7({
        "renderBody": out => {
          const _hello6 = _t(_hello);

          _hello6(null, out, "10");

          out.w("<div></div>");
        }
      }, out, "9");
    }
  }, out, `#${_noUpdateKey3}`)

  _noUpdate5({
    "cid": _noUpdateKey4,
    "if": x,
    "bodyOnly": true,
    "renderBody": out => {
      const _hello9 = _t(_hello);

      _hello9({
        "renderBody": out => {
          const _hello8 = _t(_hello);

          _hello8(null, out, "14");

          out.w("<div></div>");
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