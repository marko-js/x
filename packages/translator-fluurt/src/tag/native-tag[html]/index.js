import SELF_CLOSING from "self-closing-tags";
import { types as t } from "@marko/babel-types";
import write from "../../util/html-write";
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
    
    const writer = write(path);
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

    const startTag = writer`<${tagName}${translateAttributes(path, path.get("attributes"))}>`

    if (SELF_CLOSING.indexOf(tagName) !== -1) {
      return path.replaceWith(startTag);
    }

    path.replaceWithMultiple([
      startTag,
      ...(needsBlock ? t.blockStatement(body) : body),
      writer`</${tagName}>`
    ]);
  }
};
