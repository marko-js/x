import withPreviousLocation from "../../../util/with-previous-location";
import write from "../../../util/html-out-write";
import { replaceInRenderBody } from "./_util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { startTag, children, endTag }
  } = path;
  replaceInRenderBody(path, [
    withPreviousLocation(write`<!--`, startTag),
    ...children,
    withPreviousLocation(write`-->`, endTag)
  ]);
}
