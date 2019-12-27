import { resolve } from "path";
import SELF_CLOSING from "self-closing-tags";
import { types as t } from "@marko/babel-types";
import write from "../../util/vdom-out-write";
import { assertNoParams, assertNoArgs } from "@marko/babel-utils";
import * as FLAGS from "../../util/runtime-flags";
import { getAttrs } from "../util";

const EMPTY_OBJECT = {};
const SIMPLE_ATTRS = ["id", "class", "style"];
const MAYBE_SVG = {
  a: true,
  script: true,
  style: true,
  title: true
};

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const { hub, node, parent } = path;
  const { name, key, body: { body }, properties, handlers, tagDef } = node;
  const { value: tagName } = name;

  path.get("attributes").forEach(attr => {
    // Remove falsey attributes.
    const { confident, value: computed } = attr.get("value").evaluate();

    if (confident && (computed == null || computed === false)) {
      attr.remove();
    }
  });

  const tagProperties = properties.slice();
  const isSelfClosing = SELF_CLOSING.indexOf(tagName) !== -1;
  const attrsObj = getAttrs(path, true, true);
  const writeArgs = [
    isSelfClosing ? "e" : "be",
    name,
    attrsObj,
    key,
    t.identifier("component"),
    body.length ? t.nullLiteral() : t.numericLiteral(0)
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
    t.isObjectExpression(attrsObj) &&
    attrsObj.properties.every(n => isPropertyName(n, SIMPLE_ATTRS)) &&
    !tagProperties.some(n => isPropertyName(n, ["noupdate"]))
  ) {
    node.runtimeFlags |= FLAGS.HAS_SIMPLE_ATTRS;
  }

  if (tagDef) {
    const { htmlType, name, parseOptions = EMPTY_OBJECT } = tagDef;
    if (htmlType === "custom-element") {
      node.runtimeFlags |= FLAGS.IS_CUSTOM_ELEMENT;
      if (parseOptions.import) {
        // TODO: the taglib should be updated to support this as a top level option.
        hub.meta.deps.push(resolve(tagDef.dir, parseOptions.import));
      }
    } else if (
      htmlType === "svg" ||
      (MAYBE_SVG[name] &&
        t.isMarkoTag(parent) &&
        parent.tagDef &&
        parent.tagDef.htmlType === "svg")
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
    path.replaceWith(writeStartNode);
    return;
  }

  let writeEndNode = write("ee");

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    const negatedBodyOnlyIf = t.unaryExpression("!", bodyOnlyIf, true);
    writeStartNode = t.ifStatement(negatedBodyOnlyIf, writeStartNode);
    writeEndNode = t.ifStatement(negatedBodyOnlyIf, writeEndNode);
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

  path.replaceWithMultiple(
    [writeStartNode]
      .concat(needsBlock ? t.blockStatement(body) : body)
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
