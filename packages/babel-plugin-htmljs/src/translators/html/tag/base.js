import toCamel from "camelcase";
import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";
import write from "../../../util/html-out-write";
import * as translateDirective from "../directive";
import translateAttributes from "../attributes";
import { replaceInRenderBody, toStatement } from "./_util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { startTag, children, endTag }
  } = path;

  const attributes = [];

  for (const attr of path.get("startTag").get("attributes")) {
    const { name } = attr.node;
    if (!name) {
      // TODO: handle spread.
      attr.remove();
      continue;
    }

    const directive = translateDirective[toCamel(name)];
    if (directive) {
      directive(path, attr);
      attr.remove();
    } else {
      attributes.push(attr);
    }
  }

  let writeStartNode = withPreviousLocation(
    write`<${startTag.name}${translateAttributes(attributes)}>`,
    startTag
  );

  let writeEndNode = withPreviousLocation(write`</${endTag.name}>`, endTag);

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
