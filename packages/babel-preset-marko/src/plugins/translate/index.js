import HTMLDocumentType from "./html-document-type";
import HTMLDeclaration from "./html-declaration";
import HTMLCDATA from "./html-cdata";
import HTMLElement from "./html-element";
import HTMLText from "./html-text";
import HTMLPlaceholder from "./html-placeholder";
import HTMLScriptlet from "./html-scriptlet";

export const visitor = {
  HTMLDocumentType,
  HTMLDeclaration,
  HTMLCDATA,
  HTMLElement,
  HTMLText,
  HTMLPlaceholder,
  HTMLScriptlet,
  HTMLComment(path) {
    path.remove();
  }
};
