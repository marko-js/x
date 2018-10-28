import * as t from "../definitions";
import SELF_CLOSING from "self-closing-tags";
import Printer from "@babel/generator/lib/printer";

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

    this.token("$ ");

    if (node.body.length === 1) {
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
        this.print(node.value, node);
      }
    }
  },
  HTMLSpreadAttribute(node) {
    this.token("...");
    this.print(node.value, node);
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
