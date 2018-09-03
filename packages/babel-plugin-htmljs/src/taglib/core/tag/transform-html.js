import * as t from "../../../definitions";
import write from "../../../util/html-out-write";
import withPreviousLocation from "../../../util/with-previous-location";
import translateAttributes from "./attributes";
import { replaceInRenderBody, toStatement } from "../util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    hub: { lookup },
    node: { startTag, children, endTag }
  } = path;

  const tagName = startTag.name.value;
  const attributes = [];

  for (const attr of path.get("startTag").get("attributes")) {
    const { name } = attr.node;
    if (!name) {
      // TODO: handle spread.
      attr.remove();
      continue;
    }

    // TODO: re-add directives.
    // const directive = translateDirectives[toCamel(name)];
    // if (directive) {
    //   directive(path, attr);
    //   attr.remove();
    // } else {
    //   attributes.push(attr);
    // }
  }

  // TODO self closing tags.
  let writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(attributes)}>`,
    startTag
  );

  let writeEndNode = withPreviousLocation(write`</${tagName}>`, endTag);

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    writeStartNode = t.ifStatement(
      bodyOnlyIf,
      t.blockStatement([toStatement(writeStartNode)])
    );
    writeEndNode = t.ifStatement(
      bodyOnlyIf,
      t.blockStatement([toStatement(writeEndNode)])
    );
  }

  replaceInRenderBody(path, [writeStartNode, ...children, writeEndNode]);
}
