import write from "../../../util/html-out-write";
import {
  replaceInRenderBody,
  assertAllowedAttributes,
  assertNoParams,
  assertNoArgs
} from "../util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { body }
  } = path;

  assertNoParams(path);
  assertNoArgs(path);
  assertAllowedAttributes(path, []);

  replaceInRenderBody(path, [
    write`<!--`,
    ...body,
    write`-->`
  ]);
}
