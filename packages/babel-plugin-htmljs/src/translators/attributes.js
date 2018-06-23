import normalizeQuasi from "../util/normalize-quasi";

export function translateAttributes(attrs) {
  const quasis = [];
  const expressions = [];
  let curString = "";

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const name = attr.node.name;

    if (!name) {
      continue; // TODO spread.
    }

    const { confident, value = attr.node.value } = attr.get("value").evaluate();

    if (confident) {
      if (value == null || value === false) {
        continue;
      }
    }

    curString += ` ${name}`;

    if (confident) {
      if (value === true) {
        continue;
      }

      curString += `=${value}`;
    } else {
      quasis.push(curString + "=");
      expressions.push(value);
      curString = "";
    }
  }

  quasis.push(curString);

  return normalizeQuasi(quasis, expressions);
}
