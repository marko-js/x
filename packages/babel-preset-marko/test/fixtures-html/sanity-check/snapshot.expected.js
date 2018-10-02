import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _other from "./components/other/index.marko";
import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { cl as _marko_class_merge, xc as _marko_escapeStyle, xs as _marko_escapeScript, a as _marko_attr, d as _marko_dynamicTag, x as _marko_escapeXml, as as _marko_attrs } from "marko/src/runtime/html/helpers";
import a from "b";
export { something };
doThings();
andStuff();

function more() {
  abc();
}

function _thing(stuff, out) {
  out.w(`<div${_marko_attr("x", stuff.x)}></div>`);
}

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/sanity-check/template.marko";

_marko_template._ = _marko_renderer(_marko_render, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent({
  onCreate() {
    this.stuff();
  }

}, _marko_template._)
export default _marko_template;

function _marko_render(input, out, __component, component, state) {
  out.w(`<style>div { color:${_marko_escapeStyle(x)}; }</style><script>var y =${_marko_escapeScript(x)};</script>`)
  var b = thing;
  let c = thing;
  out.w(`<div${_marko_attr("b", b)}${_marko_attr("c", c)}>`)
  {
    var d = thing;
    let e = thing;
    out.w(`<div${_marko_attr("d", d)}${_marko_attr("e", e)}></div>`);
  }
  out.w(`</div><div${_marko_attr("data-marko", {
    onclick: __component.d("click", "handleClick", [a, b, ...d], false)
  })}></div><div${_marko_attr("id", __component.elId("1"))}></div><div${_marko_attr("class", _marko_class_merge(["a", {
    b: c,
    d
  }]))}${_marko_attr("style", _marko_style_merge({
    a: "b"
  }))}></div><input type="text">`)

  _marko_dynamicTag(a, {
    "renderBody": out => {
      out.w("<div></div>");
    }
  }, out, __component, "@x")

  _thing({
    "x": 1
  }, out)

  _other({
    "renderBody": (out, a) => {
      out.w("<div></div>");
    }
  }, out, "13", ["click", "handleClick", false, [a, b, ...d]])

  _other({
    "x": 1,
    ...thing,
    "b": {
      a: 1
    },
    ...c,
    "renderBody": (out, b) => {
      out.w("<div></div>");
    },
    "c": {
      "c": 1,
      "renderBody": out => {
        out.w("<div></div>");
      },
      "d": {
        "d": 1,
        "renderBody": out => {
          out.w("<div></div>");
        }
      }
    }
  }, out, "19")

  out.w(`<div id="a" class="b c" a="[object Object]" c="${d}"${_marko_attrs(e)}>${_marko_escapeXml(a)}<!--abc--><div c="1"></div><div d="1"></div>`)

  if (x === a) {
    out.w(`a${_marko_escapeXml(b)}`);
  } else if (x === 2) {
    out.w("b");
  } else {
    out.w("c");
  }

  out.w(`</div><div b="1"></div><div>123 abc 123</div><span${_marko_attrs(abc)}></span>`)

  if (cond) {
    out.w(`Hello${_marko_escapeXml(planet)}`);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.w("<div c=\"1\"></div>");
  }

  for (const key in obj) {
    const val = obj[key];
    out.w("<div c=\"1\"></div>");
  }

  let _i2 = -1;

  for (const val of arr) {
    let i = _i2++;
    i;
    out.w("<div c=\"1\"></div>");

    _other({
      "d": 2
    }, out, `@${val.name}`);
  }

  out.w("<div>Hi</div>\n\n  <div>\n\n    Hi\n\n  </div>\n\n")

  if (false) {
    out.w("<div>");
  }

  out.w("Hi")

  if (false) {
    out.w("</div>");
  }
}

_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/sanity-check/template.marko",
  deps: [{
    "type": "css",
    "code": "div {\n    color: green;\n  }",
    "path": "./template.marko",
    "virtualPath": "./template.marko.css"
  }],
  tags: ["./components/other/index.marko"]
}