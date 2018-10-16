import path from "path";
import { getClientPath } from "lasso-modules-client/transport";
import * as t from "./definitions";
import { NodePath, Scope } from "@babel/traverse";
import { parse, parseExpression } from "@babel/parser";
import { buildLookup } from "./taglib";
import createFile from "./util/create-file";
import codeFrameError from "./util/code-frame-error";
import { getLoc, getLocRange } from "./util/get-loc";
import getComponentFiles from "./util/get-component-files";

export class Hub {
  constructor(filename, code, options = {}) {
    options.output = options.output || "html";

    this.code = code;
    this.options = options;
    this.filename = filename;
    this.file = createFile(filename, code);
    this.lookup = buildLookup(path.dirname(filename));
    this.componentFiles = getComponentFiles(filename);
    this.macros = Object.create(null);
    this.meta = {
      deps: [],
      tags: []
    };
    this._imports = Object.create(null);
    this._renderBlock = t.blockStatement([]);
    this._componentClass = null;
    this._nextKey = 0;

    this.file.program.body.push(this._renderBlock);

    const {
      styleFile,
      packageFile,
      componentFile,
      componentBrowserFile
    } = this.componentFiles;

    if (styleFile) {
      this.meta.deps.push(styleFile);
    }

    if (packageFile) {
      this.meta.deps.push(packageFile);
    }

    this.isImplicit = true;

    if (componentFile) {
      this.isImplicit = false;
      this.meta.component = componentFile;
      this._componentClass = this.importDefault(
        this.createNodePath(this.file.program, true),
        this.resolveRelativePath(componentFile),
        "marko_component"
      );
    }

    if (componentBrowserFile) {
      this.isImplicit = false;
      this.isSplit = true;
      this.meta.component = componentBrowserFile;
    }
  }

  getCode() {
    return this.code;
  }

  buildError(node, msg) {
    return codeFrameError(this.filename, this.code, msg, node.start, node.end);
  }

  createNodePath(node = this.file, withScope) {
    const nodePath = new NodePath(this, this.file);
    nodePath.node = node;

    if (withScope) {
      nodePath.scope = new Scope(nodePath);
      nodePath.scope.init();
    }

    return nodePath;
  }

  getClientPath(file) {
    return getClientPath(file);
  }

  resolveRelativePath(filename) {
    const dir = path.dirname(this.filename);
    let relativePath = path.isAbsolute(filename)
      ? path.relative(dir, filename)
      : filename;
    if (/^[^./]/.test(relativePath)) relativePath = `./${relativePath}`;
    return relativePath.replace(/^(?:\.{1,2}\/)+node_modules\//, "");
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

    if (!nameHint) {
      return;
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

  nextKey() {
    return Object.assign(t.stringLiteral(String(this._nextKey++)), {
      _autoKey: true
    });
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
