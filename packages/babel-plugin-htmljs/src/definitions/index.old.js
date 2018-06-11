import shallowEqual from "@babel/types/lib/utils/shallowEqual";
import defineType from "@babel/types/lib/definitions/utils";
import types from "./types";

Object.keys(types).forEach(name => defineType(name, types[name]));

export * from "@babel/types";

import builder from "@babel/types/lib/builders/builder";
import {
  isFile as isBabelFile,
  isExpression as isBabelExpression,
  isLiteral as isBabelLiteral,
  isStringLiteral as isBabelStringLiteral
} from "@babel/types";

export const markoFile = MarkoFile;
export function MarkoFile(...args) {
  return builder("MarkoFile", ...args);
}

export const htmlDocumentType = HTMLDocumentType;
export function HTMLDocumentType(...args) {
  return builder("HTMLDocumentType", ...args);
}

export const htmlDeclaration = HTMLDeclaration;
export function HTMLDeclaration(...args) {
  return builder("HTMLDeclaration", ...args);
}

export const htmlCDATA = HTMLCDATA;
export function HTMLCDATA(...args) {
  return builder("HTMLCDATA", ...args);
}

export const htmlComment = HTMLComment;
export function HTMLComment(...args) {
  return builder("HTMLComment", ...args);
}

export const htmlText = HTMLText;
export function HTMLText(...args) {
  return builder("HTMLText", ...args);
}

export const htmlPlaceholder = HTMLPlaceholder;
export function HTMLPlaceholder(...args) {
  return builder("HTMLPlaceholder", ...args);
}

export const htmlSpreadAttribute = HTMLSpreadAttribute;
export function HTMLSpreadAttribute(...args) {
  return builder("HTMLSpreadAttribute", ...args);
}

export const htmlAttribute = HTMLAttribute;
export function HTMLAttribute(...args) {
  return builder("HTMLAttribute", ...args);
}

export const htmlStartTag = HTMLStartTag;
export function HTMLStartTag(...args) {
  return builder("HTMLStartTag", ...args);
}

export const htmlEndTag = HTMLEndTag;
export function HTMLEndTag(...args) {
  return builder("HTMLEndTag", ...args);
}

export const htmlElement = HTMLElement;
export function HTMLElement(...args) {
  return builder("HTMLElement", ...args);
}

export function isMarkoFile(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("MarkoFile" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isMarko(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (
    "Marko" === nodeType ||
    "MarkoFile" === nodeType ||
    "HTMLDocumentType" === nodeType ||
    "HTMLDeclaration" === nodeType ||
    "HTMLCDATA" === nodeType ||
    "HTMLComment" === nodeType ||
    "HTMLText" === nodeType ||
    "HTMLPlaceholder" === nodeType ||
    "HTMLSpreadAttribute" === nodeType ||
    "HTMLAttribute" === nodeType ||
    "HTMLStartTag" === nodeType ||
    "HTMLEndTag" === nodeType ||
    "HTMLElement" === nodeType
  ) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isFile(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (
    isBabelFile(node, opts) ||
    "File" === nodeType ||
    "MarkoFile" === nodeType
  ) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLDocumentType(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLDocumentType" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isExpression(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (
    isBabelExpression(node, opts) ||
    "Expression" === nodeType ||
    "HTMLDocumentType" === nodeType ||
    "HTMLDeclaration" === nodeType ||
    "HTMLCDATA" === nodeType ||
    "HTMLComment" === nodeType ||
    "HTMLPlaceholder" === nodeType ||
    "HTMLStartTag" === nodeType ||
    "HTMLEndTag" === nodeType ||
    "HTMLElement" === nodeType
  ) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isLiteral(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (
    isBabelLiteral(node, opts) ||
    "Literal" === nodeType ||
    "HTMLDocumentType" === nodeType ||
    "HTMLDeclaration" === nodeType ||
    "HTMLCDATA" === nodeType ||
    "HTMLComment" === nodeType ||
    "HTMLText" === nodeType
  ) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLDeclaration(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLDeclaration" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLCDATA(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLCDATA" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLComment(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLComment" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLText(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLText" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isStringLiteral(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if (
    isBabelStringLiteral(node, opts) ||
    "StringLiteral" === nodeType ||
    "HTMLText" === nodeType
  ) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLPlaceholder(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLPlaceholder" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLSpreadAttribute(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLSpreadAttribute" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLAttribute(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLAttribute" === nodeType || "HTMLSpreadAttribute" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLStartTag(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLStartTag" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLEndTag(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLEndTag" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}

export function isHTMLElement(node, opts) {
  if (!node) return false;
  const nodeType = node.type;

  if ("HTMLElement" === nodeType) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }

  return false;
}
