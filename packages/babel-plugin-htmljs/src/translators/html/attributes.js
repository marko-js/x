import normalizeTemplateString from "../../util/normalize-template-string";

export default function(attrs) {
  const quasis = [];
  const expressions = [];
  let curString = "";

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const { name, value } = attr.node;

    if (!name) {
      continue; // TODO spread.
    }

    const { confident, value: computed } = attr.get("value").evaluate();

    if (confident && (computed == null || computed === false)) {
      continue;
    }

    curString += ` ${name}`;

    if (confident && typeof computed !== "object") {
      if (computed === true) {
        continue;
      }

      curString += `=${computed}`;
    } else {
      quasis.push(curString + "=");
      expressions.push(value);
      curString = "";
    }
  }

  quasis.push(curString);

  return normalizeTemplateString(quasis, expressions);
}
