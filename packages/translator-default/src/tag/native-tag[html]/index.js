import { resolve } from "path";
import SELF_CLOSING from "self-closing-tags";
import { types as t } from "@marko/babel-types";
import { getTagDef } from "@marko/babel-utils";
import write from "../../util/html-out-write";
import { hasAutoKey } from "../../util/key-manager";
import translateAttributes from "./attributes";
import getComponentFiles from "../../util/get-component-files";

const EMPTY_OBJECT = {};

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const { hub, node } = path;
  const {
    name: { value: tagName },
    body: { body },
    properties,
    handlers
  } = node;
  const tagProperties = properties.slice();
  const tagDef = getTagDef(path);

  if (tagDef) {
    const { parseOptions = EMPTY_OBJECT } = tagDef;
    if (parseOptions.import) {
      // TODO: the taglib should be updated to support this as a top level option.
      hub.meta.deps.push(resolve(tagDef.dir, parseOptions.import));
    }
  }

  if (handlers) {
    Object.entries(handlers).forEach(
      ([eventName, { arguments: args, once }]) => {
        const delegateArgs = [t.stringLiteral(eventName), args[0]];

        // TODO: look into only sending this if once is true.
        delegateArgs.push(t.booleanLiteral(once));

        if (args.length > 1) {
          delegateArgs.push(t.arrayExpression(args.slice(1)));
        }

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

  const isHTML = hub.options.output === "html";
  let dataMarko = t.stringLiteral("");

  if (isHTML) {
    const componentFiles = getComponentFiles(path);
    const isSplit = Boolean(componentFiles.componentBrowserFile);
    const isImplicit = Boolean(
        !hub.inlineComponentClass && !componentFiles.componentFile && !hub._hasTagParams
    );

    const isSplitOrPreserved = isSplit || isPreserved(path);

    if (isSplitOrPreserved || isImplicit) {
      if (tagProperties.length) {
        // TODO we should pre evaluate this if it is static.
        dataMarko = t.callExpression(
          hub.importDefault(
            path,
            "marko/src/runtime/html/helpers/data-marko",
            "marko_props"
          ),
          [t.objectExpression(tagProperties)]
        )
      }
    }

    if (isSplitOrPreserved) {
      if (!hasAutoKey(path)) {
        path.pushContainer(
          "attributes",
          t.markoAttribute(
            "data-marko-key",
            t.callExpression(
              hub.importDefault(
                path,
                "marko/src/runtime/html/helpers/data-marko-key",
                "marko_key"
              ),
              [path.get("key").node, hub._componentDefIdentifier]
            )
          )
        );
      }
    }
  }

  const writeStartNode = write`<${tagName}${dataMarko}${translateAttributes(path, path.get("attributes"))}>`;

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    path.replaceWith(writeStartNode);
    return;
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
      .concat(write`</${tagName}>`)
  );
}

function isPreserved(path) {
  let parentTag = path;
  do {
    parentTag = parentTag.parentPath.parentPath;
    if (parentTag.get("isPreserved").node === true) {
      return true;
    }
  } while (t.isMarkoTag(parentTag));

  return false;
}