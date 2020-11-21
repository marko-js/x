<div style={
  color: input.color
}/>
<div style={
  width: 100
}/>
<div style="color: green"/>

_customTag({
  style: {
    color: input.color
  }
});

_customTag({
  style: {
    width: 100
  }
});

_customTag({
  style: "color: green"
});

<${input.test} style={
  color: "green"
} test={
  style: {
    color: "green"
  }
}/>
import _customTag from "./components/custom-tag.marko";