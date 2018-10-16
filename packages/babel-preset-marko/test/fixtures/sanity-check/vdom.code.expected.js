import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _htmlComment from "marko/src/taglibs/html/html-comment-tag.js";
import _other from "./components/other/index.marko";
import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { cl as _marko_class_merge, d as _marko_dynamicTag } from "marko/src/runtime/html/helpers";
import a from "b";
export { a };
doThings();
andStuff();

function more() {
  abc();
}

function _thing(stuff, out) {
  out.be("div", {
    "x": stuff.x
  }, "3", component, 0, 0);
  out.ee();
}

const _marko_template = _t(__filename),
      _marko_componentType = "HpNuaWlK";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("style", null, "0", component, 0, 0)
  out.t("div { color:")
  out.t(x)
  out.t("; }")
  out.ee()
  out.be("script", null, "1", component, 0, 0)
  out.t("var y =")
  out.t(x)
  out.t(";")
  out.ee()
  var b = thing;
  let c = thing;
  out.be("div", {
    "b": b,
    "c": c
  }, "4", component, 0, 0)
  {
    var d = thing;
    let e = thing;
    out.be("div", {
      "d": d,
      "e": e
    }, "5", component, 0, 0);
    out.ee();
  }
  out.ee()
  out.be("div", null, "6", component, 0, 0, {
    onclick: __component.d("click", "handleClick", [a, b, ...d], false)
  })
  out.ee()
  out.be("div", {
    "id": __component.elId("1")
  }, "7", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge(["a", {
      b: c,
      d
    }]),
    "style": _marko_style_merge({
      a: "b"
    })
  }, "8", component, 0, 0)
  out.ee()
  out.e("input", {
    "type": "text"
  }, "9", component, 0, 0)

  _marko_dynamicTag(a, {
    "renderBody": out => {
      out.be("div", null, "10", component, 0, 0);
      out.ee();
    }
  }, out, __component, "@x")

  _thing({
    "x": 1
  }, out)

  _other({
    "renderBody": (out, a) => {
      out.be("div", null, "12", component, 0, 0);
      out.ee();
    }
  }, out, "11", ["click", "handleClick", false, [a, b, ...d]])

  _other({
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
          out.be("div", null, "16", component, 0, 0);
          out.ee();
        }
      },
      "renderBody": out => {
        out.be("div", null, "15", component, 0, 0);
        out.ee();
      }
    },
    "renderBody": (out, b) => {
      out.be("div", null, "14", component, 0, 0);
      out.ee();
    }
  }, out, "13")

  out.be("div", {
    "id": "a",
    "class": "b c",
    "a": {
      a: 1
    },
    "c": "${d}",
    ...e
  }, "17", component, 0, 0)
  out.t(a)

  _htmlComment({
    "renderBody": out => {
      out.t("abc");
    }
  }, out, "18")

  out.be("div", {
    "c": 1
  }, "19", component, 0, 0)
  out.ee()
  out.be("div", {
    "d": 1
  }, "20", component, 0, 0)
  out.ee()

  if (x === a) {
    out.t("a");
    out.t(b);
  } else if (x === 2) {
    out.t("b");
  } else {
    out.t("c");
  }

  out.ee()
  out.be("div", {
    "b": 1
  }, "24", component, 0, 0)
  out.ee()
  out.be("div", null, "25", component, 0, 0)
  out.t("123 abc 123")
  out.ee()
  out.be("span", { ...abc
  }, "26", component, 0, 0)
  out.ee()

  if (cond) {
    out.t("Hello");
    out.t(planet);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.be("div", {
      "c": 1
    }, "29", component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", {
      "c": 1
    }, "31", component, 0, 0);
    out.ee();
  }

  let _i2 = -1;

  for (const val of arr) {
    let i = _i2++;
    i;
    out.be("div", {
      "c": 1
    }, `@${val.name}`, component, 0, 0);
    out.ee();

    _other({
      "d": 2
    }, out, `@${val.name}`);
  }

  out.be("div", null, "33", component, 0, 0)
  out.t("Hi")
  out.ee()
  out.t("\n\n  ")
  out.be("div", null, "35", component, 0, 0)
  out.t("\n\n    Hi\n\n  ")
  out.ee()
  out.t("\n\n")

  if (false) {
    out.be("div", null, "36", component, 0, 0);
  }

  out.t("Hi")

  if (false) {
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent({
  onCreate() {
    this.stuff();
  }

}, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  deps: [{
    "type": "css",
    "code": "div {\n    color: green;\n  }",
    "path": "./template.marko",
    "virtualPath": "./template.marko.css"
  }],
  tags: ["./components/other/index.marko", "marko/src/taglibs/html/html-comment-tag.js"]
}
export default _marko_template;