export default function toCamelCase(str) {
  if (str.slice(0, 4) === "HTML") {
    return "html" + str.slice(4);
  } else {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
  }
}
