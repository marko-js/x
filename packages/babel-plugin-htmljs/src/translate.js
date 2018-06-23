import * as t from "./definitions";
import write from "./util/html-out-write";
import withPreviousLocation from "./util/with-previous-location";
import { translateElement } from "./translators/html-element";

export const visitor = {
  HTMLElement: {
    exit(path) {
      translateElement(path);
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
