<custom-tag style={
  color: input.color
}/>
<custom-tag style={
  width: 100
}/>
<custom-tag style="color: green"/>
<${input.test} style={
  color: "green"
}>
  <@test style={
    color: "green"
  }/>
</>
import { styleAttr as _styleAttr, write as _write } from "@marko/runtime-fluurt/debug/html";

_write(`<div${_styleAttr({
  color: input.color
})}></div><div style=width:100px></div><div style="color: green"></div>Hello`)