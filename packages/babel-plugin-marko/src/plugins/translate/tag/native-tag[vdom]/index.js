import { resolve } from "path";
import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/vdom-out-write";
import {
  replaceInRenderBody,
  toStatement,
  assertNoParams,
  assertNoArgs
} from "../../../../taglib/core/util";
import { getAttrs } from "../util";
import * as FLAGS from "../../../../util/runtime-flags";

const EMPTY_OBJECT = {};
const SIMPLE_ATTRS = ["id", "class", "style"];
const MAYBE_SVG = {
  a: true,
  script: true,
  style: true
};

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const { hub, node, parent } = path;
  const {
    name: { value: tagName },
    key,
    body,
    properties,
    handlers,
    tagDef
  } = node;

  path.get("attributes").forEach(attr => {
    // Remove falsey attributes.
    const { confident, value: computed } = attr.get("value").evaluate();

    if (confident && attr.name !== "data-marko") {
      if (computed == null || computed === false) {
        attr.remove();
      }
    }
  });

  const tagProperties = properties.slice();
  const isSelfClosing = SELF_CLOSING.indexOf(tagName) !== -1;
  const attrsObj = getAttrs(path, true);
  const writeArgs = [
    isSelfClosing ? "e" : "be",
    node.name,
    attrsObj.properties.length ? attrsObj : t.nullLiteral(),
    key,
    t.identifier("component"),
    t.numericLiteral(0) // TODO: child count
  ];

  assertNoParams(path);
  assertNoArgs(path);

  if (handlers) {
    Object.entries(handlers).forEach(
      ([eventName, { arguments: args, once }]) => {
        const delegateArgs = [t.stringLiteral(eventName), args[0]];

        if (args.length > 1) {
          delegateArgs.push(t.arrayExpression(args.slice(1)));
        }

        // TODO: look into only sending this if once is true.
        delegateArgs.push(t.booleanLiteral(once));

        // TODO: why do we output eventName twice.
        tagProperties.push(
          t.objectProperty(
            t.stringLiteral(`on${eventName}`),
            t.callExpression(
              t.memberExpression(
                hub._componentDefIdentifier,
                t.identifier("d")
              ),
              delegateArgs
            )
          )
        );
      }
    );
  }

  if (
    attrsObj.properties.length &&
    attrsObj.properties.every(n => isPropertyName(n, SIMPLE_ATTRS)) &&
    !tagProperties.some(n => isPropertyName(n, ["noupdate"]))
  ) {
    node.runtimeFlags |= FLAGS.HAS_SIMPLE_ATTRS;
  }

  if (tagDef) {
    const { htmlType, name, parseOptions = EMPTY_OBJECT } = tagDef;
    if (htmlType === "custom-element") {
      node.runtimeFlags |= FLAGS.IS_CUSTOM_ELEMENT;
      if (parseOptions.import) { // TODO: the taglib should be updated to support this as a top level option.
        hub.meta.deps.push(resolve(tagDef.dir, parseOptions.import));
      }
    } else if (
      htmlType === "svg" ||
      MAYBE_SVG[name] && t.isMarkoTag(parent) && parent.tagDef && parent.tagDef.htmlType === "svg"
    ) {
      node.runtimeFlags |= FLAGS.IS_SVG;
    } else if (name === "textarea") {
      node.runtimeFlags |= FLAGS.IS_TEXTAREA;
    }
  }

  writeArgs.push(t.numericLiteral(node.runtimeFlags));

  if (tagProperties.length) {
    writeArgs.push(t.objectExpression(tagProperties));
  }

  let writeStartNode = write(...writeArgs);

  if (isSelfClosing) {
    replaceInRenderBody(path, writeStartNode);
    return;
  }

  let writeEndNode = write("ee");

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    const negatedBodyOnlyIf = t.unaryExpression("!", bodyOnlyIf, true);
    writeStartNode = t.ifStatement(
      negatedBodyOnlyIf,
      t.blockStatement([toStatement(writeStartNode)])
    );
    writeEndNode = t.ifStatement(
      negatedBodyOnlyIf,
      t.blockStatement([toStatement(writeEndNode)])
    );
  }

  let needsBlock;
  for (const childNode of body) {
    if (t.isVariableDeclaration(childNode)) {
      if (childNode.kind === "const" || childNode.kind === "let") {
        needsBlock = true;
        break;
      }
    }
  }

  replaceInRenderBody(
    path,
    [writeStartNode]
      .concat(needsBlock ? t.blockStatement(body.map(toStatement)) : body)
      .concat(writeEndNode)
  );
}

function isPropertyName({ key }, names) {
  if (t.isStringLiteral(key)) {
    return names.includes(key.value);
  } else if (t.isIdentifier(key)) {
    return names.includes(key.name);
  }
}
