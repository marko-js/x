import toCamel from "camelcase";
import * as t from "./definitions";
import write from "./util/html-out-write";
import withPreviousLocation from "./util/with-previous-location";
import * as translators from "./translators";

export const visitor = {
  Program: {
    enter(path) {
      const { node, hub } = path;
      const {
        file: {
          ast: { parse, parseExpression }
        }
      } = hub;
      Object.assign(hub, { parse, parseExpression });
      node.renderBody = [];
    },
    exit(path) {
      const { node } = path;
      const renderBody = t.blockStatement([]);
      renderBody.body = node.renderBody;
      // Create the render function which html nodes will move to.
      node.body.push(
        t.functionDeclaration(
          t.identifier("render"),
          [t.identifier("out")],
          renderBody
        )
      );
    }
  },
  HTMLElement: {
    exit(path) {
      const name = toCamel(path.node.startTag.name);
      const tagTranslators = translators.html.tag;
      const translate = tagTranslators[name] || tagTranslators.base;
      translate(path);
    }
  },
  HTMLText(path) {
    const replacement = withPreviousLocation(
      write`${t.stringLiteral(path.node.value)}`,
      path.node
    );

    if (t.isProgram(path.parent)) {
      if (path.node.value.trim()) path.parent.renderBody.push(replacement);
      path.remove();
    } else {
      path.replaceWith(replacement);
    }
  },
  HTMLPlaceholder(path) {
    const replacement = withPreviousLocation(
      write`${path.node.value}`,
      path.node
    );
    if (t.isProgram(path.parent)) {
      path.remove();
      path.parent.renderBody.push(replacement);
    } else {
      path.replaceWith(replacement);
    }
  },
  HTMLScriptlet(path) {
    const { body } = path.node;

    if (t.isProgram(path.parent)) {
      path.remove();
      path.parent.renderBody.push(...body);
    } else {
      path.replaceWithMultiple(body);
    }
  },
  HTMLComment(path) {
    path.remove();
  }
};
