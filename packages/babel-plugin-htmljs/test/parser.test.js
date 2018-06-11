const { parse } = require("../src/html-parser");
const { translate } = require("../src/translate");

const source = `
import helper from './helpers';

<div ...x a=123..toFixed(2)>
    Hello \${name}
</div>
`.trim();

const markoAST = parse(source, "./test.js");
const jsAST = translate(markoAST);

console.log(
  "\n\n*** START MARKO ***\n\n",
  JSON.stringify(markoAST, null, 2),
  "\n\n*** END MARKO ***\n\n"
);

console.log(
  "\n\n*** START JS ***\n\n",
  JSON.stringify(jsAST, null, 2),
  "\n\n*** END JS ***\n\n"
);
