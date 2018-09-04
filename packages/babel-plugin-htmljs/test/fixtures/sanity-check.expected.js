import { escape as _escape3 } from "@marko/runtime/helpers";
import { stringifyAttrs as _stringifyAttrs2 } from "@marko/runtime/helpers";
import { stringifyAttrs as _stringifyAttrs } from "@marko/runtime/helpers";
import { escape as _escape2 } from "@marko/runtime/helpers";
import { escape as _escape } from "@marko/runtime/helpers";
import _other from "../components/other.marko";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcGllcmNleS9EZXZlbG9wbWVudC9naXRodWIveC9wYWNrYWdlcy9iYWJlbC1wbHVnaW4taHRtbGpzL3Rlc3QvZml4dHVyZXMvc2FuaXR5LWNoZWNrLm1hcmtvIl0sIm5hbWVzIjpbImEiLCJzb21ldGhpbmciLCJkb1RoaW5ncyIsImFuZFN0dWZmIiwibW9yZSIsImFiYyIsIm9uQ3JlYXRlIiwic3R1ZmYiLCJ0aGluZyIsImMiLCJlIiwieCIsImIiLCJjb25kIiwicGxhbmV0IiwiaSIsImtleSIsIm9iaiIsInZhbCIsImFyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE9BQU9BLENBQVAsTUFBYyxHQUFkO0FBQ0EsU0FBU0MsU0FBVDtBQUdFQyxRQUFRO0FBQ1JDLFFBQVE7O0FBQ1IsU0FBU0MsSUFBVCxHQUFnQjtBQUNkQyxFQUFBQSxHQUFHO0FBQ0o7O3lCQUdILE1BQU07QUFDSkMsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsU0FBS0MsS0FBTDtBQUNEOztBQUhHLEM7OztBQU1OOztjQUVFUCxDOzs7U0FFTSxDO09BQUtRLEs7U0FBUTtBQUFFUixNQUFBQSxDQUFDLEVBQUU7QUFBTCxLO09BQVlTLEM7O0FBQy9CLDBCOzs7O0FBR0YsK0VBQTJDQyxDQUEzQyxhQUNHVixDQURIOztNQU1NVyxDQUFDLEtBQUtYLEM7QUEvQlosdUJBK0JtQlksQ0EvQm5CLEk7YUFnQ1dELENBQUMsS0FBSyxDO0FBaENqQixjOztBQUFBLGM7OztBQW9DQSx3REFHUU4sR0FIUjs7TUFLR1EsSTtBQXpDSCwyQkEwQ1NDLE1BMUNULEk7OztnQkE2Q1ksQyxRQUFLLEUsUUFBUSxDO1VBQXRCQyxDO0FBQ0QsZ0M7OzthQUdDQyxHLElBQWNDLEc7VUFBVEMsRyxHQUFTRCxHLENBQWRELEc7QUFDRCxnQzs7Ozs7YUFHQ0UsRyxJQUFZQyxHO1FBQVBKLEM7QUFDTkEsSUFBQUEsQ0FBQztBQUNELGdDOzs7QUFHRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhIGZyb20gXCJiXCI7XG5leHBvcnQgeyBzb21ldGhpbmcgfTtcblxuc3RhdGljIHtcbiAgZG9UaGluZ3MoKTtcbiAgYW5kU3R1ZmYoKTtcbiAgZnVuY3Rpb24gbW9yZSgpIHtcbiAgICBhYmMoKTtcbiAgfVxufVxuXG5jbGFzcyB7XG4gIG9uQ3JlYXRlKCkge1xuICAgIHRoaXMuc3R1ZmYoKTtcbiAgfVxufVxuXG48aW5wdXQgdHlwZT1cInRleHRcIj5cblxuPCR7YX0vPlxuXG48b3RoZXIgeD0xIC4uLnRoaW5nIGI9eyBhOiAxIH0gLi4uYz5cbiAgPGRpdi8+XG48L290aGVyPlxuXG48ZGl2I2EuYiBjbGFzcz1cImNcIiBhPXthOiAxfSBjICA9ICBcIiR7ZH1cIiAuLi5lPlxuICAke2F9XG4gIDwhLS0xMjMtLT5cbiAgPGh0bWwtY29tbWVudD5hYmM8L2h0bWwtY29tbWVudD5cbiAgPGRpdiBjPTEvPlxuICA8ZGl2IGQ9MS8+XG4gIDxpZj0oeCA9PT0gYSk+YSAke2J9PC8+XG4gIDxlbHNlIGlmPSh4ID09PSAyKT5cbiAgICBiXG4gIDwvZWxzZT5cbiAgPGVsc2U+YzwvZWxzZT5cbjwvZGl2PlxuPGRpdiBiPTEvPlxuXG48c3BhbiAuLi5hYmMvPlxuXG48aWY9Y29uZD5cbiAgSGVsbG8gJHtwbGFuZXR9XG48L2lmPlxuXG48Zm9yKGkpIGZyb209MCB0bz0xMCBzdGVwPTI+XG4gIDxkaXYgYz0xLz5cbjwvZm9yPlxuXG48Zm9yKGtleSwgdmFsKSBpbj1vYmo+XG4gIDxkaXYgYz0xLz5cbjwvZm9yPlxuXG48Zm9yKHZhbCwgaSkgb2Y9YXJyIGJ5PVwibmFtZVwiPlxuICAkIGlcbiAgPGRpdiBjPTEvPlxuPC9mb3I+XG5cbjxkaXYgbWFya28tcHJlc2VydmUtd2hpdGVzcGFjZT5cblxuICBIaVxuXG48L2Rpdj5cblxuPGRpdiBib2R5LW9ubHktaWY9dHJ1ZT5cbiAgSGlcbjwvZGl2PiJdfQ==