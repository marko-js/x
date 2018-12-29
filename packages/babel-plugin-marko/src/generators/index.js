import * as t from "../definitions";
import SELF_CLOSING from "self-closing-tags";
import Printer from "@babel/generator/lib/printer";

const UNENCLOSED_WHITESPACE_TYPES = [
  "LogicalExpression",
  "AssignmentExpression",
  "ConditionalExpression",
  "BinaryExpression",
  "NewExpression",
  "FunctionDeclaration",
  "AssignmentExpression"
];

Object.assign(Printer.prototype, {
  HTMLDocumentType(node) {
    this.token("<!");
    this.token(node.value);
    this.token(">");
  },
  HTMLDeclaration(node) {
    this.token("<?");
    this.token(node.value);
    this.token("?>");
  },
  HTMLCDATA(node) {
    this.token("<![CDATA[");
    this.token(node.value);
    this.token("]]>");
  },
  HTMLComment(node) {
    this.token("<!--");
    this.token(node.value);
    this.token("-->");
  },
  HTMLPlaceholder(node) {
    this.token(node.escape ? "${" : "!${");
    this.print(node.value, node);
    this.token("}");
  },
  HTMLScriptlet(node) {
    if (!this.endsWith("\n")) {
      this.token("\n");
    }

    this.token(`${node.static ? "static" : "$"} `);

    if (node.body.length === 1) {
      // TODO should determine if node has unenclosed newlines.
      this.print(node.body[0], node);
      this.token("\n");
    } else {
      this.token("{");
      this.newline();
      this.indent();
      this.printSequence(node.body, node);
      this.dedent();
      this.token("}");
    }
  },
  HTMLClass(node) {
    this.token("class");
    this.token(" ");
    this.print(node.body, node);
  },
  HTMLAttribute(node) {
    this.token(node.name);

    if (node.modifier) {
      this.token(":");
      this.token(node.modifier);
    }

    if (node.arguments) {
      this.token("(");
      this.printList(node.arguments, node);
      this.token(")");
    }

    if (node.value) {
      if (!t.isBooleanLiteral(node.value) || !node.value.value) {
        this.token("=");

        printWithParansIfNeeded.call(this, node.value, node);
      }
    }
  },
  HTMLSpreadAttribute(node) {
    this.token("...");
    printWithParansIfNeeded.call(this, node.value, node);
  },
  HTMLText(node) {
    this.word(node.value);
  },
  HTMLElement(node) {
    const start = node.startTag;
    const tagName = start.name.value;
    const selfClosing = !node.children.length || SELF_CLOSING.includes(tagName);
    this.print(start, node);
    if (selfClosing) {
      this.token("/>");
    } else {
      this.token(">");
      this.newline();
      this.printSequence(node.children, node, { indent: true });
      this.print(node.endTag, node);
    }
  },

  HTMLStartTag(node) {
    this.token("<");

    if (t.isStringLiteral(node.name)) {
      const tagName = node.name.value;
      this.token(tagName);
    } else {
      this.token("${");
      this.print(node.name, node);
      this.token("}");
    }

    if (node.params.length) {
      this.token("(");
      this.printList(node.params, node);
      this.token(")");
    }

    if (node.attributes.length > 0) {
      this.token(" ");
      this.printJoin(node.attributes, node, { separator: spaceSeparator });
    }
  },
  HTMLEndTag(node) {
    this.token("</");
    if (t.isStringLiteral(node.name)) {
      this.token(node.name.value);
    }
    this.token(">");
  }
});

function spaceSeparator() {
  this.token(" ");
}

function printWithParansIfNeeded(value, parent) {
  const needsParans = hasUnenclosedWhitespace(value);

  if (needsParans) {
    this.token("(");
  }

  this.print(value, parent);

  if (needsParans) {
    this.token(")");
  }
}

function hasUnenclosedWhitespace(node) {
  return UNENCLOSED_WHITESPACE_TYPES.includes(node.type);
}
