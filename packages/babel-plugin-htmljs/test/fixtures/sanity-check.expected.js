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

  out.w(`</div><div b="1"></div><span${_stringifyAttrs2(abc)}></span>`)

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

  out.w("<div marko-preserve-whitespace>Hi</div><div body-only-if>Hi</div>")
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcGllcmNleS9EZXZlbG9wbWVudC9naXRodWIveC9wYWNrYWdlcy9iYWJlbC1wbHVnaW4taHRtbGpzL3Rlc3QvZml4dHVyZXMvc2FuaXR5LWNoZWNrLm1hcmtvIl0sIm5hbWVzIjpbImEiLCJzb21ldGhpbmciLCJkb1RoaW5ncyIsImFuZFN0dWZmIiwibW9yZSIsImFiYyIsIm9uQ3JlYXRlIiwic3R1ZmYiLCJ0aGluZyIsImMiLCJlIiwieCIsImIiLCJjb25kIiwicGxhbmV0IiwiaSIsImtleSIsIm9iaiIsInZhbCIsImFyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE9BQU9BLENBQVAsTUFBYyxHQUFkO0FBQ0EsU0FBU0MsU0FBVDtBQUdFQyxRQUFRO0FBQ1JDLFFBQVE7O0FBQ1IsU0FBU0MsSUFBVCxHQUFnQjtBQUNkQyxFQUFBQSxHQUFHO0FBQ0o7O3lCQUdILE1BQU07QUFDSkMsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsU0FBS0MsS0FBTDtBQUNEOztBQUhHLEM7OztBQU1OOztjQUVFUCxDOzs7U0FFTSxDO09BQUtRLEs7U0FBUTtBQUFFUixNQUFBQSxDQUFDLEVBQUU7QUFBTCxLO09BQVlTLEM7O0FBQy9CLDBCOzs7V0FDSyxDOztBQUNILDRCOzs7YUFDSyxDOztBQUNILDhCOzs7Ozs7QUFLTiwrRUFBMkNDLENBQTNDLGFBQ0dWLENBREg7O01BTU1XLENBQUMsS0FBS1gsQztBQXJDWix1QkFxQ21CWSxDQXJDbkIsSTthQXNDV0QsQ0FBQyxLQUFLLEM7QUF0Q2pCLGM7O0FBQUEsYzs7O0FBMENBLHdEQUdRTixHQUhSOztNQUtHUSxJO0FBL0NILDJCQWdEU0MsTUFoRFQsSTs7O2dCQW1EWSxDLFFBQUssRSxRQUFRLEM7VUFBdEJDLEM7QUFDRCxnQzs7O2FBR0NDLEcsSUFBY0MsRztVQUFUQyxHLEdBQVNELEcsQ0FBZEQsRztBQUNELGdDOzs7OzthQUdDRSxHLElBQVlDLEc7UUFBUEosQztBQUNOQSxJQUFBQSxDQUFDO0FBQ0QsZ0M7OztBQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGEgZnJvbSBcImJcIjtcbmV4cG9ydCB7IHNvbWV0aGluZyB9O1xuXG5zdGF0aWMge1xuICBkb1RoaW5ncygpO1xuICBhbmRTdHVmZigpO1xuICBmdW5jdGlvbiBtb3JlKCkge1xuICAgIGFiYygpO1xuICB9XG59XG5cbmNsYXNzIHtcbiAgb25DcmVhdGUoKSB7XG4gICAgdGhpcy5zdHVmZigpO1xuICB9XG59XG5cbjxpbnB1dCB0eXBlPVwidGV4dFwiPlxuXG48JHthfS8+XG5cbjxvdGhlciB4PTEgLi4udGhpbmcgYj17IGE6IDEgfSAuLi5jPlxuICA8ZGl2Lz5cbiAgPEBjIGM9MT5cbiAgICA8ZGl2Lz5cbiAgICA8QGQgZD0xPlxuICAgICAgPGRpdi8+XG4gICAgPC9AZD5cbiAgPC9AYz5cbjwvb3RoZXI+XG5cbjxkaXYjYS5iIGNsYXNzPVwiY1wiIGE9e2E6IDF9IGMgID0gIFwiJHtkfVwiIC4uLmU+XG4gICR7YX1cbiAgPCEtLTEyMy0tPlxuICA8aHRtbC1jb21tZW50PmFiYzwvaHRtbC1jb21tZW50PlxuICA8ZGl2IGM9MS8+XG4gIDxkaXYgZD0xLz5cbiAgPGlmPSh4ID09PSBhKT5hICR7Yn08Lz5cbiAgPGVsc2UgaWY9KHggPT09IDIpPlxuICAgIGJcbiAgPC9lbHNlPlxuICA8ZWxzZT5jPC9lbHNlPlxuPC9kaXY+XG48ZGl2IGI9MS8+XG5cbjxzcGFuIC4uLmFiYy8+XG5cbjxpZj1jb25kPlxuICBIZWxsbyAke3BsYW5ldH1cbjwvaWY+XG5cbjxmb3IoaSkgZnJvbT0wIHRvPTEwIHN0ZXA9Mj5cbiAgPGRpdiBjPTEvPlxuPC9mb3I+XG5cbjxmb3Ioa2V5LCB2YWwpIGluPW9iaj5cbiAgPGRpdiBjPTEvPlxuPC9mb3I+XG5cbjxmb3IodmFsLCBpKSBvZj1hcnIgYnk9XCJuYW1lXCI+XG4gICQgaVxuICA8ZGl2IGM9MS8+XG48L2Zvcj5cblxuPGRpdiBtYXJrby1wcmVzZXJ2ZS13aGl0ZXNwYWNlPlxuXG4gIEhpXG5cbjwvZGl2PlxuXG48ZGl2IGJvZHktb25seS1pZj10cnVlPlxuICBIaVxuPC9kaXY+Il19