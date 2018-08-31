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
  }}" c="${d}">`)
  out.w(a)
  out.w("<!--")
  out.w("abc")
  out.w("-->")
  out.w("<div c=\"1\">")
  out.w("</div>")
  out.w("<div d=\"1\">")
  out.w("</div>")

  if (x === a) {
    out.w("a");
    out.w(b);
  } else if (x === 2) {
    out.w("b");
  } else {
    out.w("c");
  }

  out.w("</div>")
  out.w("<div b=\"1\">")
  out.w("</div>")
  out.w("<span>")
  out.w("</span>")

  if (cond) {
    out.w("Hello");
    out.w(planet);
  }

  for (let _i = 0; _i <= 10; _i += 2) {
    const i = _i;
    out.w("<div c=\"1\">");
    out.w("</div>");
  }

  for (const key in obj) {
    const val = obj[key];
    out.w("<div c=\"1\">");
    out.w("</div>");
  }

  let _i2 = -1;

  for (const val of arr) {
    let i = _i2++;
    i;
    out.w("<div c=\"1\">");
    out.w("</div>");
  }

  out.w("<div>")
  out.w("\n\n  Hi\n\n")
  out.w("</div>")

  if (false) {
    out.w("<div>");
  }

  out.w("Hi")

  if (false) {
    out.w("</div>");
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcGllcmNleS9EZXZlbG9wbWVudC9naXRodWIveC9wYWNrYWdlcy9iYWJlbC1wbHVnaW4taHRtbGpzL3Rlc3QvZml4dHVyZXMvc2FuaXR5LWNoZWNrLm1hcmtvIl0sIm5hbWVzIjpbImEiLCJzb21ldGhpbmciLCJkb1RoaW5ncyIsImFuZFN0dWZmIiwibW9yZSIsImFiYyIsIm9uQ3JlYXRlIiwic3R1ZmYiLCJ4IiwiYiIsImNvbmQiLCJwbGFuZXQiLCJpIiwia2V5Iiwib2JqIiwidmFsIiwiYXJyIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxDQUFQLE1BQWMsR0FBZDtBQUNBLFNBQVNDLFNBQVQ7QUFHRUMsUUFBUTtBQUNSQyxRQUFROztBQUNSLFNBQVNDLElBQVQsR0FBZ0I7QUFDZEMsRUFBQUEsR0FBRztBQUNKOzt5QkFHSCxNQUFNO0FBQ0pDLEVBQUFBLFFBQVEsR0FBRztBQUNULFNBQUtDLEtBQUw7QUFDRDs7QUFIRyxDOzs7QUFNTixzQ0FBb0I7QUFBQ1AsSUFBQUEsQ0FBQyxFQUFFO0FBQUosR0FBcEI7QUFDRSxRQUFDQSxDQUFEO0FBRUE7QUFwQkY7QUFvQm1CO0FBQ2pCO0FBQVE7QUFDUjtBQUFROztNQUNKUSxDQUFDLEtBQUtSLEM7QUF2QlosYztBQXVCa0IsVUFBQ1MsQ0FBRCxDO2FBQ1BELENBQUMsS0FBSyxDO0FBeEJqQixjOztBQUFBLGM7OztBQTRCQTtBQUNBO0FBQVE7QUFFUjtBQUFZOztNQUVURSxJO0FBakNILGtCO0FBa0NRLFVBQUNDLE1BQUQsQzs7O2dCQUdJLEMsUUFBSyxFLFFBQVEsQztVQUF0QkMsQztBQUNELDBCO0FBQVEsbUI7OzthQUdQQyxHLElBQWNDLEc7VUFBVEMsRyxHQUFTRCxHLENBQWRELEc7QUFDRCwwQjtBQUFRLG1COzs7OzthQUdQRSxHLElBQVlDLEc7UUFBUEosQztBQUNOQSxJQUFBQSxDQUFDO0FBQ0QsMEI7QUFBUSxtQjs7O0FBR1Y7QUFJQztBQUFEOzs7QUFFQSxrQjs7O0FBeERBOzs7QUEwREEsbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYSBmcm9tIFwiYlwiO1xuZXhwb3J0IHsgc29tZXRoaW5nIH07XG5cbnN0YXRpYyB7XG4gIGRvVGhpbmdzKCk7XG4gIGFuZFN0dWZmKCk7XG4gIGZ1bmN0aW9uIG1vcmUoKSB7XG4gICAgYWJjKCk7XG4gIH1cbn1cblxuY2xhc3Mge1xuICBvbkNyZWF0ZSgpIHtcbiAgICB0aGlzLnN0dWZmKCk7XG4gIH1cbn1cblxuPGRpdiNhLmIgY2xhc3M9XCJjXCIgYT17YTogMX0gYyAgPSAgXCIke2R9XCI+XG4gICR7YX1cbiAgPCEtLTEyMy0tPlxuICA8aHRtbC1jb21tZW50PmFiYzwvaHRtbC1jb21tZW50PlxuICA8ZGl2IGM9MS8+XG4gIDxkaXYgZD0xLz5cbiAgPGlmPSh4ID09PSBhKT5hICR7Yn08Lz5cbiAgPGVsc2UgaWY9KHggPT09IDIpPlxuICAgIGJcbiAgPC9lbHNlPlxuICA8ZWxzZT5jPC9lbHNlPlxuPC9kaXY+XG48ZGl2IGI9MS8+XG5cbjxzcGFuIC4uLmFiYy8+XG5cbjxpZj1jb25kPlxuICBIZWxsbyAke3BsYW5ldH1cbjwvaWY+XG5cbjxmb3IoaSkgZnJvbT0wIHRvPTEwIHN0ZXA9Mj5cbiAgPGRpdiBjPTEvPlxuPC9mb3I+XG5cbjxmb3Ioa2V5LCB2YWwpIGluPW9iaj5cbiAgPGRpdiBjPTEvPlxuPC9mb3I+XG5cbjxmb3IodmFsLCBpKSBvZj1hcnIgYnk9XCJuYW1lXCI+XG4gICQgaVxuICA8ZGl2IGM9MS8+XG48L2Zvcj5cblxuPGRpdiBtYXJrby1wcmVzZXJ2ZS13aGl0ZXNwYWNlPlxuXG4gIEhpXG5cbjwvZGl2PlxuXG48ZGl2IGJvZHktb25seS1pZj10cnVlPlxuICBIaVxuPC9kaXY+Il19