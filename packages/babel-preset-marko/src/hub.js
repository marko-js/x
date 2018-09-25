import path from "path";
import { getClientPath } from "lasso-modules-client/transport";
import * as t from "./definitions";
import { NodePath } from "@babel/traverse";
import { parse, parseExpression } from "@babel/parser";
import { buildLookup } from "./taglib";
import createFile from "./util/create-file";
import codeFrameError from "./util/code-frame-error";
import { getLoc, getLocRange } from "./util/get-loc";

export class Hub {
  constructor(filename, code, options = {}) {
    this.code = code;
    this.options = options;
    this.filename = filename;
    this.file = createFile(filename, code);
    this.lookup = buildLookup(path.dirname(filename));
    this._imports = Object.create(null);
    this._renderBody = [];
    this._componentClass = null;
  }

  getCode() {
    return this.code;
  }

  buildError(node, msg) {
    return codeFrameError(this.filename, this.code, msg, node.start, node.end);
  }

  createNodePath(node = this.file) {
    const nodePath = new NodePath(this, this.file);
    nodePath.node = node;
    return nodePath;
  }

  getClientPath(file) {
    return getClientPath(file);
  }

  importDefault(path, file, nameHint) {
    const { _imports } = this;
    let importDeclaration = _imports[file];
    let specifiers;

    if (!importDeclaration) {
      importDeclaration = _imports[file] = t.importDeclaration(
        [],
        t.stringLiteral(file)
      );
      specifiers = importDeclaration.specifiers;
      this.file.program.body.unshift(importDeclaration);
    } else {
      specifiers = _imports[file].specifiers;
    }

    const specifier = specifiers.find(specifier =>
      t.isImportDefaultSpecifier(specifier)
    );

    if (!specifier) {
      const identifier = path.scope.generateUidIdentifier(nameHint);
      specifiers.push(t.importDefaultSpecifier(identifier));
      return identifier;
    }

    return specifier.local;
  }

  importNamed(path, file, name, nameHint = name) {
    const { _imports } = this;
    let importDeclaration = _imports[file];
    let specifiers;

    if (!importDeclaration) {
      importDeclaration = _imports[file] = t.importDeclaration(
        [],
        t.stringLiteral(file)
      );
      specifiers = importDeclaration.specifiers;
      this.file.program.body.unshift(importDeclaration);
    } else {
      specifiers = _imports[file].specifiers;
    }

    const specifier = specifiers.find(
      specifier =>
        t.isImportSpecifier(specifier) && specifier.imported.name === name
    );

    if (!specifier) {
      const identifier = path.scope.generateUidIdentifier(nameHint);
      specifiers.push(t.importSpecifier(identifier, t.identifier(name)));
      return identifier;
    }

    return specifier.local;
  }

  createNode(type, start, end, ...args) {
    return {
      ...t[type](...args),
      ...getLocRange(this.code, start, end)
    };
  }

  parse(str, start) {
    return this._tryParseJS(false, str, start);
  }

  parseExpression(str, start) {
    return this._tryParseJS(true, str, start);
  }

  _tryParseJS(isExpression, str, start) {
    const { line, column } = getLoc(str, start);
    const opts = { ...this.options.jsParseOptions, startLine: line };
    const length = str.length - 1 + column;
    const padding = length - str.length - 1;
    str = str.padStart(length, " ");

    try {
      return isExpression
        ? parseExpression(str, opts)
        : parse(str, opts).program;
    } catch (err) {
      let { pos, message } = err;
      if (pos) {
        pos -= padding;
        pos += start;
        throw codeFrameError(
          this.filename,
          this.code,
          message.replace(/ *\(\d+:\d+\)$/, ""),
          pos
        );
      } else {
        throw err;
      }
    }
  }
}
