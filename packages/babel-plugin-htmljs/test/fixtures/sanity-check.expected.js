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
  }} c=${d}`}>`)
  out.w(a)
  out.w("<!--")
  out.w("abc")
  out.w("-->")
  out.w("<div c=1>")
  out.w("</div>")
  out.w("<div d=1>")
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
  out.w("<div b=1>")
  out.w("</div>")
  out.w("<span>")
  out.w("</span>")

  if (cond) {
    out.w("Hello");
    out.w(planet);
  }

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