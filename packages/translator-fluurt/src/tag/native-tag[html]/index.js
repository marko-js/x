import SELF_CLOSING from "self-closing-tags";
import { types as t } from "@marko/babel-types";
import write from "../../util/html-out-write";
import withPreviousLocation from "../../util/with-previous-location";
import translateAttributes from "./attributes";
import {
  assertNoParams,
  assertNoArgs,
  assertNoAttributeTags
} from "@marko/babel-utils";

/**
 * Translates the html streaming version of a standard html element.
 */
export default {
  exit(path) {
    assertNoArgs(path);
    assertNoParams(path);
    assertNoAttributeTags(path);

    const { node } = path;
    const {
      name: { value: tagName },
      body: { body }
    } = node;
    const needsBlock = body.some(
      it =>
        t.isVariableDeclaration(it) &&
        (it.kind === "const" || it.kind === "let")
    );

    const writeStartNode = withPreviousLocation(
      write`<${tagName}${translateAttributes(path, path.get("attributes"))}>`,
      node
    );

    if (SELF_CLOSING.indexOf(tagName) !== -1) {
      path.replaceWith(writeStartNode);
      return;
    }

    path.replaceWithMultiple(
      [writeStartNode]
        .concat(needsBlock ? t.blockStatement(body) : body)
        .concat(write`</${tagName}>`)
    );
  }
};
