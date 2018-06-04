import "@babel/register";
import types from "./types";

export default () => {
  let code = "import builder from '@babel/types/lib/builders/builder';";

  Object.keys(types).forEach(name => {
    code += `
    export { ${name} as ${camelName(name)} };
    export function ${name} (...args) {
      return builder("${name}", ...args);
    }
    `;
  });

  return code;
};

function camelName(name) {
  if (name.slice(0, 4) === "HTML") {
    return "html" + name.slice(4);
  } else {
    return name.slice(0, 1).toLowerCase() + name.slice(1);
  }
}
