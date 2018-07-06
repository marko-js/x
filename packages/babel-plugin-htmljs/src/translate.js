import * as t from "./definitions";
import write from "./util/html-out-write";
import withPreviousLocation from "./util/with-previous-location";
import * as translators from "./translators";

export const visitor = {
  HTMLElement: {
    exit(path) {
      const name = path.node.startTag.name;
      const tagTranslators = translators.html.tag;
      const translate = tagTranslators[name] || tagTranslators.base;
      translate(path);
    }
  },
  HTMLText(path) {
    path.replaceWith(
      withPreviousLocation(
        write`${t.stringLiteral(path.node.value)}`,
        path.node
      )
    );
  },
  HTMLPlaceholder(path) {
    path.replaceWith(write`${path.node.value}`);
  }
};
