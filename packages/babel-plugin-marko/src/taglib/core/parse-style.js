import * as t from "../../definitions";
import withPreviousLocation from "../../util/with-previous-location";
const STYLE_REG = /^style(?:\.([^\s]+))?\s*\{([\s\S]*)}$/;

export default function(path) {
  const { node } = path;
  const { rawValue } = node;
  const matchedBlock = STYLE_REG.exec(rawValue);
  if (matchedBlock) {
    const [, language, code] = matchedBlock;
    path.replaceWith(withPreviousLocation(t.markoStyle(code, language), node));
  }
}
