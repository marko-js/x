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
  out.w(`<div${` a=${{
    a: 1
  }}`}>`)
  out.w("<!--")
  out.w("abc")
  out.w("-->")
  out.w("<div c=1>")
  out.w("</div>")
  out.w("<div d=1>")
  out.w("</div>")

  if (x === a) {
    out.w("a");
  } else if (x === 2) {
    out.w("b");
  } else {
    out.w("c");
  }

  out.w("</div>")
  out.w("<div b=1>")
  out.w("</div>")

  if (cond) {}

  for (let i = 0; i <= 10; i += 2) {
    out.w("<div c=1>");
    out.w("</div>");
  }

  for (let key in obj) {
    let val = obj[key];
    out.w("<div c=1>");
    out.w("</div>");
  }

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    out.w("<div c=1>");
    out.w("</div>");
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taXJhd2xpbmdzL2NvZGUveC9wYWNrYWdlcy9iYWJlbC1wbHVnaW4taHRtbGpzL3Rlc3QvZml4dHVyZXMvc2FuaXR5LWNoZWNrLm1hcmtvIl0sIm5hbWVzIjpbImEiLCJzb21ldGhpbmciLCJkb1RoaW5ncyIsImFuZFN0dWZmIiwibW9yZSIsImFiYyIsIm9uQ3JlYXRlIiwic3R1ZmYiLCJ4IiwiY29uZCIsImkiLCJrZXkiLCJvYmoiLCJ2YWwiLCJhcnIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLENBQVAsTUFBYyxHQUFkO0FBQ0EsU0FBU0MsU0FBVDtBQUdFQyxRQUFRO0FBQ1JDLFFBQVE7O0FBQ1IsU0FBU0MsSUFBVCxHQUFnQjtBQUNkQyxFQUFBQSxHQUFHO0FBQ0o7O3lCQUdILE1BQU07QUFDSkMsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsU0FBS0MsS0FBTDtBQUNEOztBQUhHLEM7OztBQU1OLHFCQUFPO0FBQUNQLElBQUFBLENBQUMsRUFBRTtBQUFKLEdBQVA7QUFFRTtBQUFrQjtBQUFEO0FBQ2pCO0FBQVE7QUFDUjtBQUFROztNQUNIUSxDQUFDLEtBQUtSLEM7QUFBSyxjO2FBQ05RLENBQUMsS0FBSyxDO0FBRWYsYzs7QUFDTyxjOzs7QUFDVjtBQUNBO0FBQVE7O01BRUpDLEk7O1dBR0RDLEMsR0FBVSxDLEVBQVZBLEMsSUFBZSxFLEVBQWZBLEMsSUFBdUIsQztBQUN4QixzQjtBQUFRLG1COzs7V0FHUEMsRyxJQUFlQyxHO1FBQVZDLEcsR0FBVUQsRyxDQUFmRCxHO0FBQ0Qsc0I7QUFBUSxtQjs7O1dBR0ZELEMsTUFBQUEsQyxHQUFRSSxHLFNBQVJKLEM7UUFBTEcsRyxHQUFhQyxHLENBQVJKLEM7QUFDTixzQjtBQUFRLG1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGEgZnJvbSBcImJcIjtcbmV4cG9ydCB7IHNvbWV0aGluZyB9O1xuXG5zdGF0aWMge1xuICBkb1RoaW5ncygpO1xuICBhbmRTdHVmZigpO1xuICBmdW5jdGlvbiBtb3JlKCkge1xuICAgIGFiYygpO1xuICB9XG59XG5cbmNsYXNzIHtcbiAgb25DcmVhdGUoKSB7XG4gICAgdGhpcy5zdHVmZigpO1xuICB9XG59XG5cbjxkaXYgYT17YTogMX0+XG4gIDwhLS0xMjMtLT5cbiAgPGh0bWwtY29tbWVudD5hYmM8L2h0bWwtY29tbWVudD5cbiAgPGRpdiBjPTEvPlxuICA8ZGl2IGQ9MS8+XG4gIDxpZj0oeCA9PT0gYSk+YTwvPlxuICA8ZWxzZSBpZj0oeCA9PT0gMik+XG4gICAgYlxuICA8L2Vsc2U+XG4gIDxlbHNlPmM8L2Vsc2U+XG48L2Rpdj5cbjxkaXYgYj0xLz5cblxuPGlmPWNvbmQ+XG48Lz5cblxuPGZvcihpKSBmcm9tPTAgdG89MTAgc3RlcD0yPlxuICA8ZGl2IGM9MS8+XG48L2Zvcj5cblxuPGZvcihrZXksIHZhbCkgaW49b2JqPlxuICA8ZGl2IGM9MS8+XG48L2Zvcj5cblxuPGZvcih2YWwsIGkpIG9mPWFycj5cbiAgPGRpdiBjPTEvPlxuPC9mb3I+Il19