import taglib from "./taglib";
import * as t from "./definitions";
import write from "./util/html-out-write";
import withPreviousLocation from "./util/with-previous-location";
import { visitor as optimizingVisitor } from "./optimize";

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
      const { hub } = path;
      const { lookup } = hub;
      const tagDef =
        lookup.getTag(path.node.startTag.name) || lookup.getTag("*");
      const { taglibId } = tagDef;
      Object.values(tagDef.transformers).forEach(transformer => {
        const module = require(transformer.path);
        const { default: fn = module } = module;
        fn(path);
      });

      if (taglibId !== "marko-core") {
        // TODO: add custom tag here.
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
