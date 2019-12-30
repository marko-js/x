const _marko_template = _t2(__filename);

export default _marko_template;
import a from "b";
doThings();
andStuff();

function more() {
  abc();
}

import { cl as _marko_class_merge } from "marko/src/runtime/html/helpers";
import { d as _marko_dynamicTag, t as _t } from "marko/src/runtime/dom/helpers";
import _other from "./components/other/index.marko";

const _other_tag = _t(_other);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("vwW5Oh1D", () => _marko_template),
      _marko_component = {
  onCreate() {
    this.stuff();
  }

};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("style", {
    "id": "css"
  }, "1", component, null, 1);
  out.t("\n  div {\n    color: ");
  out.t(x);
  out.t(";\n  }\n");
  out.ee();
  out.be("script", null, "2", component, null, 0);
  out.t("\n  var y = ");
  out.t(x);
  out.t(";\n");
  out.ee();

  function _thing(out, stuff) {
    out.be("div", {
      "x": stuff.x
    }, "4", component, 0, 0);
    out.ee();
  }

  var b = thing;
  let c = thing;
  out.be("div", {
    "b": b,
    "c": c
  }, "5", component, null, 0);
  {
    var d = thing;
    let e = thing;
    out.be("div", {
      "d": d,
      "e": e
    }, "6", component, 0, 0);
    out.ee();
  }
  out.ee();
  out.be("div", null, "7", component, 0, 0, {
    "onclick": _component.d("click", "handleClick", [a, b, ...d], false)
  });
  out.ee();
  out.be("div", {
    "id": _component.elId("1")
  }, "8", component, 0, 1);
  out.ee();
  out.be("div", {
    "class": _marko_class_merge(["a", {
      b: c,
      d
    }]),
    "style": "a:b;"
  }, "9", component, 0, 1);
  out.ee();
  out.e("input", {
    "type": "text"
  }, "10", component, 0, 0);

  _marko_dynamicTag(out, a, null, out => {
    out.be("div", null, "12", component, 0, 0);
    out.ee();
  }, null, null, _component, "@x");

  _marko_dynamicTag(out, _thing, () => ({
    "x": 1
  }), null, null, null, _component, "13");

  _other_tag({
    "renderBody": (out, a) => {
      out.be("div", null, "15", component, 0, 0);
      out.ee();
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
          out.be("div", null, "21", component, 0, 0);
          out.ee();
        }
      },
      "renderBody": out => {
        out.be("div", null, "19", component, 0, 0);
        out.ee();
      }
    },
    "renderBody": (out, b) => {
      out.be("div", null, "17", component, 0, 0);
      out.ee();
    }
  }, out, _component, "16");

  out.be("div", {
    "class": "b c",
    "a": "[object Object]",
    "c": "${d}",
    ...e,
    ...f(),
    "id": "a"
  }, "22", component, null, 0);
  out.t(a);
  out.be("div", {
    "c": "1"
  }, "23", component, 0, 0);
  out.ee();
  out.be("div", {
    "d": "1"
  }, "24", component, 0, 0);
  out.ee();

  if (x === a) {
    out.t("a ");
    out.t(b);
  } else if (x === 2) {
    out.t("b");
  } else {
    out.t("c");
  }

  out.ee();
  out.be("div", {
    "b": "1"
  }, "28", component, 0, 0);
  out.ee();
  out.be("div", null, "29", component, null, 0);
  out.t("123 abc 123");
  out.ee();
  out.be("span", abc, "30", component, 0, 0);
  out.ee();

  if (cond) {
    out.t("Hello ");
    out.t(planet);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.be("div", {
      "c": "1"
    }, "33", component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", {
      "c": "1"
    }, "35", component, 0, 0);
    out.ee();
  }

  let _i2 = 0;

  for (const val of arr) {
    let i = _i2++;
    i;
    out.be("div", {
      "c": "1"
    }, `@${val.name}`, component, 0, 0);
    out.ee();

    _other_tag({
      "d": 2
    }, out, _component, `@${val.name}`);
  }

  if (!true) out.be("div", null, "37", component, null, 0);
  out.t("Hi");
  if (!true) out.ee();
}, {
  ___type: _marko_componentType
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
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