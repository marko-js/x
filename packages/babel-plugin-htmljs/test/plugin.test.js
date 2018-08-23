import plugin from "../src/plugin";
import { transform } from "@babel/core";

const separator = text => `\n\n*** ${text} ***\n\n`;
const log = (name, content) =>
  console.log(separator(`START ${name}`) + content + separator(`END ${name}`));

const source = `import a from "b";
static {
  doThings();
  andStuff();
  function more() {
    abc();
  }
}
<div a={a: 1}>
  <div c=1/>
  <div d=1/>
  <if(x === a)>a</if>
  <else-if(x === 2)>
    b
  </else-if>
  <else>c</else>
</div>
<div b=1/>

<while(a > b)>
  <div c=1/>
</while>

<for(let i = 0; i < 2; i++)>
  <div c=1/>
</for>

<for(let key in obj)>
  <div c=1/>
</for>

<for(const x of y)>
  <div c=1/>
</for>`;

const { ast, code } = transform(source, {
  ast: true,
  code: true,
  babelrc: false,
  configFile: false,
  sourceMaps: "inline",
  sourceFileName: __filename,
  plugins: [plugin]
});

// log("JS", JSON.stringify(ast, (k, v) => {
//   if (v && typeof v === "object") {
//     // delete v.start;
//     // delete v.end;
//     delete v.loc;
//   }

//   return v;
// }, 2));
log("CODE", code);
