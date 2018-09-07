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

  out.w("<div>Hi</div>\n\n    Hi\n\n")

  if (false) {
    out.w("<div>");
  }

  out.w("Hi")

  if (false) {
    out.w("</div>");
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcGllcmNleS9EZXZlbG9wbWVudC9naXRodWIveC9wYWNrYWdlcy9iYWJlbC1wbHVnaW4taHRtbGpzL3Rlc3QvZml4dHVyZXMvc2FuaXR5LWNoZWNrLm1hcmtvIl0sIm5hbWVzIjpbImEiLCJzb21ldGhpbmciLCJkb1RoaW5ncyIsImFuZFN0dWZmIiwibW9yZSIsImFiYyIsIm9uQ3JlYXRlIiwic3R1ZmYiLCJ0aGluZyIsImMiLCJlIiwieCIsImIiLCJjb25kIiwicGxhbmV0IiwiaSIsImtleSIsIm9iaiIsInZhbCIsImFyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE9BQU9BLENBQVAsTUFBYyxHQUFkO0FBQ0EsU0FBU0MsU0FBVDtBQUdFQyxRQUFRO0FBQ1JDLFFBQVE7O0FBQ1IsU0FBU0MsSUFBVCxHQUFnQjtBQUNkQyxFQUFBQSxHQUFHO0FBQ0o7O3lCQUdILE1BQU07QUFDSkMsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsU0FBS0MsS0FBTDtBQUNEOztBQUhHLEM7OztBQU1OOztjQUVFUCxDOzs7U0FFTSxDO09BQUtRLEs7U0FBUTtBQUFFUixNQUFBQSxDQUFDLEVBQUU7QUFBTCxLO09BQVlTLEM7O0FBQy9CLDBCOzs7V0FDSyxDOztBQUNILDRCOzs7YUFDSyxDOztBQUNILDhCOzs7Ozs7QUFLTiwrRUFBMkNDLENBQTNDLGFBQ0dWLENBREg7O01BTU1XLENBQUMsS0FBS1gsQztBQXJDWix1QkFxQ21CWSxDQXJDbkIsSTthQXNDV0QsQ0FBQyxLQUFLLEM7QUF0Q2pCLGM7O0FBQUEsYzs7O0FBMENBLHdEQUdRTixHQUhSOztNQUtHUSxJO0FBL0NILDJCQWdEU0MsTUFoRFQsSTs7O2dCQW1EWSxDLFFBQUssRSxRQUFRLEM7VUFBdEJDLEM7QUFDRCxnQzs7O2FBR0NDLEcsSUFBY0MsRztVQUFUQyxHLEdBQVNELEcsQ0FBZEQsRztBQUNELGdDOzs7OzthQUdDRSxHLElBQVlDLEc7UUFBUEosQztBQUNOQSxJQUFBQSxDQUFDO0FBQ0QsZ0M7OztBQUdGOzs7QUFZQSxrQjs7O0FBNUVBOzs7QUE4RUEsbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYSBmcm9tIFwiYlwiO1xuZXhwb3J0IHsgc29tZXRoaW5nIH07XG5cbnN0YXRpYyB7XG4gIGRvVGhpbmdzKCk7XG4gIGFuZFN0dWZmKCk7XG4gIGZ1bmN0aW9uIG1vcmUoKSB7XG4gICAgYWJjKCk7XG4gIH1cbn1cblxuY2xhc3Mge1xuICBvbkNyZWF0ZSgpIHtcbiAgICB0aGlzLnN0dWZmKCk7XG4gIH1cbn1cblxuPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG5cbjwke2F9Lz5cblxuPG90aGVyIHg9MSAuLi50aGluZyBiPXsgYTogMSB9IC4uLmM+XG4gIDxkaXYvPlxuICA8QGMgYz0xPlxuICAgIDxkaXYvPlxuICAgIDxAZCBkPTE+XG4gICAgICA8ZGl2Lz5cbiAgICA8L0BkPlxuICA8L0BjPlxuPC9vdGhlcj5cblxuPGRpdiNhLmIgY2xhc3M9XCJjXCIgYT17YTogMX0gYyAgPSAgXCIke2R9XCIgLi4uZT5cbiAgJHthfVxuICA8IS0tMTIzLS0+XG4gIDxodG1sLWNvbW1lbnQ+YWJjPC9odG1sLWNvbW1lbnQ+XG4gIDxkaXYgYz0xLz5cbiAgPGRpdiBkPTEvPlxuICA8aWY9KHggPT09IGEpPmEgJHtifTwvPlxuICA8ZWxzZSBpZj0oeCA9PT0gMik+XG4gICAgYlxuICA8L2Vsc2U+XG4gIDxlbHNlPmM8L2Vsc2U+XG48L2Rpdj5cbjxkaXYgYj0xLz5cblxuPHNwYW4gLi4uYWJjLz5cblxuPGlmPWNvbmQ+XG4gIEhlbGxvICR7cGxhbmV0fVxuPC9pZj5cblxuPGZvcihpKSBmcm9tPTAgdG89MTAgc3RlcD0yPlxuICA8ZGl2IGM9MS8+XG48L2Zvcj5cblxuPGZvcihrZXksIHZhbCkgaW49b2JqPlxuICA8ZGl2IGM9MS8+XG48L2Zvcj5cblxuPGZvcih2YWwsIGkpIG9mPWFyciBieT1cIm5hbWVcIj5cbiAgJCBpXG4gIDxkaXYgYz0xLz5cbjwvZm9yPlxuXG48ZGl2IG1hcmtvLXByZXNlcnZlLXdoaXRlc3BhY2U+XG5cbiAgSGlcblxuPC9kaXY+XG5cbjxtYXJrby1wcmVzZXJ2ZS13aGl0ZXNwYWNlPlxuXG4gICAgSGlcblxuPC9tYXJrby1wcmVzZXJ2ZS13aGl0ZXNwYWNlPlxuXG48ZGl2IGJvZHktb25seS1pZj10cnVlPlxuICBIaVxuPC9kaXY+Il19