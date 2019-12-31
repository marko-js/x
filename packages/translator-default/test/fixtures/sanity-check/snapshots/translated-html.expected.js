const _marko_template = _t(__filename);

export default _marko_template;
import a from "b";
doThings();
andStuff();

function more() {
  abc();
}

import _marko_escapeStyle from "marko/src/runtime/html/helpers/escape-style-placeholder";
import _marko_escapeScript from "marko/src/runtime/html/helpers/escape-script-placeholder";
import { marko_attr as _marko_attr } from "marko/src/runtime/html/helpers/attr";
import _marko_class_merge from "marko/src/runtime/helpers/class-value";
import { marko_dynamic_tag as _marko_dynamic_tag } from "marko/src/runtime/helpers/dynamic-tag";
import _other from "./components/other/index.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _other_tag = _marko_load_tag(_other);

import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import { marko_attrs as _marko_attrs } from "marko/src/runtime/html/helpers/attrs";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "vwW5Oh1D",
      _marko_component = {
  onCreate() {
    this.stuff();
  }

};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<style id="css">\n  div {\n    color: ${_marko_escapeStyle(x)};\n  }\n</style><script>\n  var y = ${_marko_escapeScript(x)};\n</script>`);

  function _thing(out, stuff) {
    out.w(`<div${_marko_attr("x", stuff.x)}></div>`);
  }

  var b = thing;
  let c = thing;
  out.w(`<div${_marko_attr("b", b)}${_marko_attr("c", c)}>`);
  {
    var d = thing;
    let e = thing;
    out.w(`<div${_marko_attr("d", d)}${_marko_attr("e", e)}></div>`);
  }
  out.w(`</div><div></div><div${_marko_attr("id", _component.elId("1"))}></div><div${_marko_attr("class", _marko_class_merge(["a", {
    b: c,
    d
  }]))} style="a:b;"></div><input type="text">`);

  _marko_dynamic_tag(out, a, null, out => {
    out.w("<div></div>");
  }, null, null, _component, "@x");

  _marko_dynamic_tag(out, _thing, () => ({
    "x": 1
  }), null, null, null, _component, "13");

  _other_tag({
    "renderBody": (out, a) => {
      out.w("<div></div>");
    }
  }, out, _component, "14", ["click", "handleClick", false, [a, b, ...d]]);

  _other_tag({
    "x": 1,
    ...thing,
    "b": {
      a: 1
    },
    ...c,
    "c": {
      "c": 1,
      "d": {
        "d": 1,
        "renderBody": out => {
          out.w("<div></div>");
        }
      },
      "renderBody": out => {
        out.w("<div></div>");
      }
    },
    "renderBody": (out, b) => {
      out.w("<div></div>");
    }
  }, out, _component, "16");

  out.w(`<div${_marko_attrs({
    "class": "b c",
    "a": {
      a: 1
    },
    "c": "${d}",
    ...e,
    ...f(),
    "id": "a"
  })}>${_marko_escapeXml(a)}<!--abc--><div c="1"></div><div d="1"></div>`);

  if (x === a) {
    out.w(`a ${_marko_escapeXml(b)}`);
  } else if (x === 2) {
    out.w("b");
  } else {
    out.w("c");
  }

  out.w(`</div><div b="1"></div><div>123 abc 123</div><span${_marko_attrs(abc)}></span>`);

  if (cond) {
    out.w(`Hello ${_marko_escapeXml(planet)}`);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.w("<div c=\"1\"></div>");
  }

  for (const key in obj) {
    const val = obj[key];
    out.w("<div c=\"1\"></div>");
  }

  let _i2 = 0;

  for (const val of arr) {
    let i = _i2++;
    i;
    out.w("<div c=\"1\"></div>");

    _other_tag({
      "d": 2
    }, out, _component, `@${val.name}`);
  }

  if (!true) out.w("<div>");
  out.w("Hi");
  if (!true) out.w("</div>");
}, {
  ___type: _marko_componentType
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType,
  deps: [{
    "type": "css",
    "code": "div {\n    color: green;\n  }",
    "path": "./template.marko",
    "virtualPath": "./template.marko.css"
  }],
  tags: ["./components/other/index.marko"]
};