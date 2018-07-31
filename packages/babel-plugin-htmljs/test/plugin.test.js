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
</div>
<div b=1/>`;

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
