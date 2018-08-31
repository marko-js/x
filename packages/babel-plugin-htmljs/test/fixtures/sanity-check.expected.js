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
  out.w(`<div id="a" class="b c" a="${{
    a: 1
  }}" c="${d}">${a}<!--abc--><div c="1"></div><div d="1"></div>`)

  if (x === a) {
    out.w(`a${b}`);
  } else if (x === 2) {
    out.w("b");
  } else {
    out.w("c");
  }

  out.w("</div><div b=\"1\"></div><span></span>")

  if (cond) {
    out.w(`Hello${planet}`);
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

  out.w("<div>\n\n  Hi\n\n</div>")

  if (false) {
    out.w("<div>");
  }

  out.w("Hi")

  if (false) {
    out.w("</div>");
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcGllcmNleS9EZXZlbG9wbWVudC9naXRodWIveC9wYWNrYWdlcy9iYWJlbC1wbHVnaW4taHRtbGpzL3Rlc3QvZml4dHVyZXMvc2FuaXR5LWNoZWNrLm1hcmtvIl0sIm5hbWVzIjpbImEiLCJzb21ldGhpbmciLCJkb1RoaW5ncyIsImFuZFN0dWZmIiwibW9yZSIsImFiYyIsIm9uQ3JlYXRlIiwic3R1ZmYiLCJ4IiwiYiIsImNvbmQiLCJwbGFuZXQiLCJpIiwia2V5Iiwib2JqIiwidmFsIiwiYXJyIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxDQUFQLE1BQWMsR0FBZDtBQUNBLFNBQVNDLFNBQVQ7QUFHRUMsUUFBUTtBQUNSQyxRQUFROztBQUNSLFNBQVNDLElBQVQsR0FBZ0I7QUFDZEMsRUFBQUEsR0FBRztBQUNKOzt5QkFHSCxNQUFNO0FBQ0pDLEVBQUFBLFFBQVEsR0FBRztBQUNULFNBQUtDLEtBQUw7QUFDRDs7QUFIRyxDOzs7QUFNTixzQ0FBb0I7QUFBQ1AsSUFBQUEsQ0FBQyxFQUFFO0FBQUosR0FBcEIsY0FDR0EsQ0FESDs7TUFNTVEsQ0FBQyxLQUFLUixDO0FBdkJaLGNBdUJtQlMsQ0F2Qm5CLEc7YUF3QldELENBQUMsS0FBSyxDO0FBeEJqQixjOztBQUFBLGM7OztBQTRCQTs7TUFLR0UsSTtBQWpDSCxrQkFrQ1NDLE1BbENULEc7OztnQkFxQ1ksQyxRQUFLLEUsUUFBUSxDO1VBQXRCQyxDO0FBQ0QsZ0M7OzthQUdDQyxHLElBQWNDLEc7VUFBVEMsRyxHQUFTRCxHLENBQWRELEc7QUFDRCxnQzs7Ozs7YUFHQ0UsRyxJQUFZQyxHO1FBQVBKLEM7QUFDTkEsSUFBQUEsQ0FBQztBQUNELGdDOzs7QUFHRjs7O0FBTUEsa0I7OztBQXhEQTs7O0FBMERBLG1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGEgZnJvbSBcImJcIjtcbmV4cG9ydCB7IHNvbWV0aGluZyB9O1xuXG5zdGF0aWMge1xuICBkb1RoaW5ncygpO1xuICBhbmRTdHVmZigpO1xuICBmdW5jdGlvbiBtb3JlKCkge1xuICAgIGFiYygpO1xuICB9XG59XG5cbmNsYXNzIHtcbiAgb25DcmVhdGUoKSB7XG4gICAgdGhpcy5zdHVmZigpO1xuICB9XG59XG5cbjxkaXYjYS5iIGNsYXNzPVwiY1wiIGE9e2E6IDF9IGMgID0gIFwiJHtkfVwiPlxuICAke2F9XG4gIDwhLS0xMjMtLT5cbiAgPGh0bWwtY29tbWVudD5hYmM8L2h0bWwtY29tbWVudD5cbiAgPGRpdiBjPTEvPlxuICA8ZGl2IGQ9MS8+XG4gIDxpZj0oeCA9PT0gYSk+YSAke2J9PC8+XG4gIDxlbHNlIGlmPSh4ID09PSAyKT5cbiAgICBiXG4gIDwvZWxzZT5cbiAgPGVsc2U+YzwvZWxzZT5cbjwvZGl2PlxuPGRpdiBiPTEvPlxuXG48c3BhbiAuLi5hYmMvPlxuXG48aWY9Y29uZD5cbiAgSGVsbG8gJHtwbGFuZXR9XG48L2lmPlxuXG48Zm9yKGkpIGZyb209MCB0bz0xMCBzdGVwPTI+XG4gIDxkaXYgYz0xLz5cbjwvZm9yPlxuXG48Zm9yKGtleSwgdmFsKSBpbj1vYmo+XG4gIDxkaXYgYz0xLz5cbjwvZm9yPlxuXG48Zm9yKHZhbCwgaSkgb2Y9YXJyIGJ5PVwibmFtZVwiPlxuICAkIGlcbiAgPGRpdiBjPTEvPlxuPC9mb3I+XG5cbjxkaXYgbWFya28tcHJlc2VydmUtd2hpdGVzcGFjZT5cblxuICBIaVxuXG48L2Rpdj5cblxuPGRpdiBib2R5LW9ubHktaWY9dHJ1ZT5cbiAgSGlcbjwvZGl2PiJdfQ==