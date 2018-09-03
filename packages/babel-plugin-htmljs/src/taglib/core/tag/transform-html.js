import * as t from "../../../definitions";
import write from "../../../util/html-out-write";
import { SELF_CLOSING } from "../../../constants";
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
  const attributes = path.get("startTag").get("attributes");

  // TODO: re-add directives.
  // for (const attr of path.get("startTag").get("attributes")) {
  //   const { name } = attr.node;

  //   const directive = translateDirectives[toCamel(name)];
  //   if (name && directive) {
  //     directive(path, attr);
  //     attr.remove();
  //   } else {
  //     attributes.push(attr);
  //   }
  // }

  let writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(attributes)}>`,
    startTag
  );

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    replaceInRenderBody(path, writeStartNode);
    return;
  }

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
