import plugin from "../src/plugin";
import { transform } from "@babel/core";

const separator = text => `\n\n*** ${text} ***\n\n`;
const log = (name, content) =>
  console.log(separator(`START ${name}`), content, separator(`END ${name}`));

const source = `
import helper from './helpers';

<div ...x a=123..toFixed(2)>
    Hello \${name}
</div>
`.trim();

const { ast, code, map } = transform(source, {
  ast: true,
  code: false,
  babelrc: false,
  configFile: false,
  sourceMaps: "inline",
  sourceFileName: __filename,
  plugins: [plugin]
});

log("JS", JSON.stringify(ast, null, 2));
log("CODE", code);
log("MAP", map);
