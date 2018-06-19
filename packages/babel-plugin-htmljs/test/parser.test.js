const fs = require("fs");
const path = require("path");
const { parse } = require("../src/html-parser");
const { translate } = require("../src/translate");

const source = `
import helper from './helpers';

<div ...x a=123..toFixed(2)>
    Hello \${name}
</div>
`.trim();

const markoAST = parse(source, "./test.js");
const separator = text => `\n\n*** ${text} ***\n\n`;
const log = (name, content) =>
  console.log(separator(`START ${name}`), content, separator(`END ${name}`));

log("MARKO", JSON.stringify(markoAST, null, 2));

const { ast: jsAST, code: jsCode, map } = translate(markoAST, source);

log("JS", JSON.stringify(jsAST, null, 2));
log("CODE", jsCode);
log("MAP", map);

fs.writeFileSync(path.join(__dirname, "output.js"), jsCode);
