import * as t from "../definitions";
import Printer from "@babel/generator/lib/printer";

Object.assign(Printer.prototype, {
  HTMLDocumentType(node) {
    this.token("<!");
    this.token(node.value);
    this.token(">");
    this.newline();
  },
  HTMLDeclaration(node) {
    this.token("<?");
    this.token(node.value);
    this.token("?>");
    this.newline();
  },
  HTMLCDATA(node) {
    this.token("<![CDATA[");
    this.token(node.value);
    this.token("]]>");
    this.newline();
  },
  HTMLComment(node) {
    this.token("<!--");
    this.token(node.value);
    this.token("-->");
    this.newline();
  },
  HTMLPlaceholder(node) {
    this.token(node.escape ? "${" : "!${");
    this.print(node.value, node);
    this.token("}");
  },
  HTMLScriptlet(node) {
    this.token("$ ");
    this.printJoin(node.body, node, { separator: spaceSeparator });
    this.newline();
  },
  HTMLAttribute(node) {
    this.token(node.name);

    if (node.modifier) {
      this.token(":");
      this.token(node.modifier);
    }

    if (node.arguments) {
      this.token("(");
      this.printJoin(node.arguments, node, { separator: spaceSeparator });
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
    this.token(node.value);
  },
  HTMLElement(node) {
    this.newline();

    const start = node.startTag;
    this.print(start, node);
    if (start.selfClosing) return; // TODO: expose this
  
    this.indent();
    for (const child of node.children) {
      this.print(child, node);
    }
    this.dedent();
  
    this.print(node.endTag, node);
    this.newline();
  },

  HTMLStartTag(node) {
    this.token("<");

    if (t.isStringLiteral(node.name)) {
      this.token(node.name.value);
    } else {
      this.token("${");
      this.print(node.name, node);
      this.token("}");
    }

    if (node.params.length) {
      this.token("(");
      this.printJoin(node.params, node, { separator: spaceSeparator });
      this.token(")");
    }

    if (node.attributes.length > 0) {
      this.space();
      this.printJoin(node.attributes, node, { separator: spaceSeparator });
    }

    if (node.selfClosing) { // TODO: add self closing to ast.
      this.space();
      this.token("/>");
    } else {
      this.token(">");
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
  this.space();
}