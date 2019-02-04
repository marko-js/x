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
  }, "2", component, 0, 0);
  out.ee();
}

import { cl as _marko_class_merge } from "marko/src/runtime/html/helpers";
import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { d as _marko_dynamicTag, t as _t } from "marko/src/runtime/vdom/helpers";
import _other from "./components/other/index.marko";

const _other_tag = _t(_other);

import _htmlComment from "marko/src/taglibs/html/html-comment-tag.js";

const _htmlComment_tag = _t(_htmlComment);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "8f1lFGb_";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("style", {}, "0", component, 0, 0)
  out.t("\n  div {\n    color: ")
  out.t(x)
  out.t(";\n  }\n")
  out.ee()
  out.be("script", {}, "1", component, 0, 0)
  out.t("\n  var y = ")
  out.t(x)
  out.t(";\n")
  out.ee()
  var b = thing;
  let c = thing;
  out.be("div", {
    "b": b,
    "c": c
  }, "5", component, 0, 0)
  {
    var d = thing;
    let e = thing;
    out.be("div", {
      "d": d,
      "e": e
    }, "4", component, 0, 0);
    out.ee();
  }
  out.ee()
  out.be("div", {}, "6", component, 0, 0, {
    "onclick": __component.d("click", "handleClick", [a, b, ...d], false)
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
      out.be("div", {}, "10", component, 0, 0);
      out.ee();
    }
  }, out, __component, "@x")

  _thing({
    "x": 1
  }, out)

  _other_tag({
    "renderBody": (out, a) => {
      out.be("div", {}, "12", component, 0, 0);
      out.ee();
    }
  }, out, "13", ["click", "handleClick", false, [a, b, ...d]])

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
          out.be("div", {}, "16", component, 0, 0);
          out.ee();
        }
      },
      "renderBody": out => {
        out.be("div", {}, "15", component, 0, 0);
        out.ee();
      }
    },
    "renderBody": (out, b) => {
      out.be("div", {}, "14", component, 0, 0);
      out.ee();
    }
  }, out, "19")

  out.be("div", {
    "id": "a",
    "class": "b c",
    "a": {
      a: 1
    },
    "c": "${d}",
    ...e,
    ...f()
  }, "26", component, 0, 0)
  out.t(a)

  _htmlComment_tag({
    "renderBody": out => {
      out.t("abc");
    }
  }, out, "20")

  out.be("div", {
    "c": 1
  }, "21", component, 0, 0)
  out.ee()
  out.be("div", {
    "d": 1
  }, "22", component, 0, 0)
  out.ee()

  if (x === a) {
    out.t("a ");
    out.t(b);
  } else if (x === 2) {
    out.t("b");
  } else {
    out.t("c");
  }

  out.ee()
  out.be("div", {
    "b": 1
  }, "27", component, 0, 0)
  out.ee()
  out.be("div", {}, "28", component, 0, 0)
  out.t("123 abc 123")
  out.ee()
  out.be("span", { ...abc
  }, "29", component, 0, 0)
  out.ee()

  if (cond) {
    out.t("Hello ");
    out.t(planet);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.be("div", {
      "c": 1
    }, "31", component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", {
      "c": 1
    }, "33", component, 0, 0);
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

    _other_tag({
      "d": 2
    }, out, `@${val.name}`);
  }

  if (!true) {
    out.be("div", {}, "36", component, 0, 0);
  }

  out.t("Hi")

  if (!true) {
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