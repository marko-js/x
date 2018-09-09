import write from "../../util/html-out-write";
import withPreviousLocation from "../../util/with-previous-location";
import {
  replaceInRenderBody,
  assertAllowedAttributes,
  assertNoParams
} from "./util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { startTag, children, endTag }
  } = path;

  assertNoParams(path);
  assertAllowedAttributes(path, []);

  replaceInRenderBody(path, [
    withPreviousLocation(write`<!--`, startTag),
    ...children,
    withPreviousLocation(write`-->`, endTag)
  ]);
}
