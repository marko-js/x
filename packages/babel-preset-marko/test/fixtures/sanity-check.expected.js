import { escape as _escape3 } from "@marko/runtime/helpers";
import { stringifyAttrs as _stringifyAttrs2 } from "@marko/runtime/helpers";
import { stringifyAttrs as _stringifyAttrs } from "@marko/runtime/helpers";
import { escape as _escape2 } from "@marko/runtime/helpers";
import { escape as _escape } from "@marko/runtime/helpers";
import _other from "../components/other/index.marko";
import { dynamicTag as _dynamicTag } from "@marko/runtime/helpers";
import a from "b";
export { something };
doThings();
andStuff();

function more() {
  abc();
}

export const component = class {
  onCreate() {
    this.stuff();
  }

};

function render(out) {
  out.w("<input type=\"text\">")

  _dynamicTag(a, null, out)

  _other({
    "x": 1,
    ...thing,
    "b": {
      a: 1
    },
    ...c,
    "renderBody": out => {
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
  }, out)

  out.w(`<div id="a" class="b c" a="[object Object]" c="${d}"${_stringifyAttrs(e)}>${_escape(a)}<!--abc--><div c="1"></div><div d="1"></div>`)

  if (x === a) {
    out.w(`a${_escape2(b)}`);
  } else if (x === 2) {
    out.w("b");
  } else {
    out.w("c");
  }

  out.w(`</div><div b="1"></div><div>123 abc 123</div><span${_stringifyAttrs2(abc)}></span>`)

  if (cond) {
    out.w(`Hello${_escape3(planet)}`);
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