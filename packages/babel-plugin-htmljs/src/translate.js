import { relative } from "path";
import * as moduleImports from "@babel/helper-module-imports";
import * as t from "./definitions";
import write from "./util/html-out-write";
import withPreviousLocation from "./util/with-previous-location";
import { visitor as optimizingVisitor } from "./optimize";
import { replaceInRenderBody } from "./taglib/core/util";

export const visitor = {
  Program: {
    enter(path) {
      const { hub } = path;
      const {
        file: {
          ast: { lookup, parse, parseExpression }
        }
      } = hub;

      Object.assign(hub, {
        lookup,
        parse,
        parseExpression,
        renderBody: []
      });
    },
    exit(path) {
      const { node, hub } = path;
      node.body.push(
        t.functionDeclaration(
          t.identifier("render"),
          [t.identifier("out")],
          Object.assign(t.blockStatement([]), { body: hub.renderBody })
        )
      );

      path.traverse(optimizingVisitor);
    }
  },
  HTMLElement: {
    exit(path) {
      const { hub, node } = path;
      const { startTag } = node;
      const { name } = startTag;
      const {
        lookup,
        file: {
          opts: { filename }
        }
      } = hub;
      let tagDef;
      let transformers;

      if (t.isStringLiteral(name)) {
        tagDef = lookup.getTag(name.value);
      } else {
        // TODO: dynamic tag.
        return path.remove();
      }

      if (tagDef) {
        transformers = tagDef.transformers;
      } else {
        transformers = lookup.getTag("*").transformers;
      }

      Object.values(transformers).forEach(transformer => {
        const module = require(transformer.path);
        const { default: fn = module } = module;
        fn(path);
      });

      if (tagDef && tagDef.taglibId !== "marko-core") {
        const relativePath = relative(filename, tagDef.template);
        const identifier = moduleImports.addDefault(path, relativePath, {
          nameHint: tagDef.name
        });

        replaceInRenderBody(
          path,
          t.callExpression(identifier, [
            attrsToObject(path.get("startTag").get("attributes")),
            t.identifier("out")
          ])
        );
      }
    }
  },
  HTMLText(path) {
    const { node, hub } = path;
    const replacement = withPreviousLocation(
      write`${t.stringLiteral(node.value)}`,
      node
    );

    if (t.isProgram(path.parent)) {
      if (node.value.trim()) hub.renderBody.push(replacement);
      path.remove();
    } else {
      path.replaceWith(replacement);
    }
  },
  HTMLPlaceholder(path) {
    // TODO Safe/Unsafe helper
    const { node, hub } = path;
    const replacement = withPreviousLocation(write`${node.value}`, node);
    if (t.isProgram(path.parent)) {
      path.remove();
      hub.renderBody.push(replacement);
    } else {
      path.replaceWith(replacement);
    }
  },
  HTMLScriptlet(path) {
    const {
      node: { body },
      hub
    } = path;

    if (t.isProgram(path.parent)) {
      path.remove();
      hub.renderBody.push(...body);
    } else {
      path.replaceWithMultiple(body);
    }
  },
  HTMLComment(path) {
    path.remove();
  }
};

function attrsToObject(attrs) {
  if (!attrs.length) {
    return t.nullLiteral();
  }

  const len = attrs.length;
  const properties = new Array(len);

  for (let i = 0; i < len; i++) {
    const { name, value } = attrs[i].node;
    properties[i] = name
      ? t.objectProperty(t.stringLiteral(name), value)
      : t.spreadElement(value);
  }

  return t.objectExpression(properties);
}
