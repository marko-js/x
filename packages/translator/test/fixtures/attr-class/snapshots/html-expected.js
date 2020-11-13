<custom-tag class=["a", {
  b: c,
  d
}]/>
<custom-tag class=["a", false, "b"]/>
<${input.test} class=["a", {
  b: c,
  d
}]>
  <@test class=["a", {
    b: c,
    d
  }]/>
</>
import { classAttr as _classAttr, write as _write } from "@marko/runtime-fluurt/debug/html";

_write(`<div${_classAttr(["a", {
  b: c,
  d
}])}></div><div class="a b"></div><div class="a b c"></div>Hello`)