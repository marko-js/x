<div class=["a", {
  b: c,
  d
}]/>
<div class=["a", false, "b"]/>
<div class="a b c"/>

_customTag({
  class: ["a", {
    b: c,
    d
  }]
});

_customTag({
  class: ["a", false, "b"]
});

<${input.test} class=["a", {
  b: c,
  d
}] test={
  class: ["a", {
    b: c,
    d
  }]
}/>
import _customTag from "./components/custom-tag.marko";