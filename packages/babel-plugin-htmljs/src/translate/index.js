import Program from "./program";
import HTMLElement from "./html-element";
import HTMLText from "./html-text";
import HTMLPlaceholder from "./html-placeholder";
import HTMLScriptlet from "./html-scriptlet";

export const visitor = {
  Program,
  HTMLElement,
  HTMLText,
  HTMLPlaceholder,
  HTMLScriptlet,
  HTMLComment(path) {
    path.remove();
  }
};
