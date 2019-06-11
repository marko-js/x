import path from "path";
import { getClientPath } from "lasso-modules-client/transport";
import "./generators";
import * as t from "./definitions";
import { parse, parseExpression } from "@babel/parser";
import { buildLookup } from "./taglib";
import createFile from "./util/create-file";
import codeFrameError from "./util/code-frame-error";
import { getLoc, getLocRange } from "./util/get-loc";
import getComponentFiles from "./util/get-component-files";
import checksum from "./util/checksum";

export class Hub {
  constructor(filename, code, options) {
    options.output = options.output || "html";

    this._code = code;
    this.options = options;
    this.filename = filename;
    this.file = createFile(filename, code);
    this.lookup = buildLookup(path.dirname(filename));
    this.componentFiles = getComponentFiles(filename);
    this.macros = Object.create(null);
    this.meta = this.file.markoMeta = {
      id: checksum(this.getClientPath(this.filename)),
      deps: [],
      tags: []
    };
    this._imports = Object.create(null);
    this._componentClass = null;
    this._nextKey = 0;
    this.moduleCode = undefined;

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
    }

    if (componentBrowserFile) {
      this.isImplicit = false;
      this.isSplit = true;
      this.meta.component = componentBrowserFile;
    }
  }

  getCode() {
    return this._code;
  }

  buildError(node, msg) {
    return codeFrameError(this.filename, this._code, msg, node.start, node.end);
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
    file = remapProductionMarkoBuild(path, file);
    const { _imports } = this;
    let importDeclaration = _imports[file];

    if (!importDeclaration) {
      const programPath = getProgram(path);
      importDeclaration = _imports[file] = programPath.pushContainer(
        "body",
        t.importDeclaration([], t.stringLiteral(file))
      )[0];
    }

    if (!nameHint) {
      return;
    }

    const specifiers = importDeclaration.get("specifiers");
    const specifier = specifiers.find(specifier =>
      specifier.isImportDefaultSpecifier()
    );

    if (!specifier) {
      const identifier = path.scope.generateUidIdentifier(nameHint);
      importDeclaration.pushContainer(
        "specifiers",
        t.importDefaultSpecifier(identifier)
      );
      return identifier;
    }

    return t.identifier(specifier.node.local.name);
  }

  importNamed(path, file, name, nameHint = name) {
    file = remapProductionMarkoBuild(path, file);
    const { _imports } = this;
    let importDeclaration = _imports[file];

    if (!importDeclaration) {
      const programPath = getProgram(path);
      importDeclaration = _imports[file] = programPath.pushContainer(
        "body",
        t.importDeclaration([], t.stringLiteral(file))
      )[0];
    }

    const specifiers = importDeclaration.get("specifiers");
    const specifier = specifiers.find(
      specifier =>
        specifier.isImportSpecifier() && specifier.node.imported.name === name
    );

    if (!specifier) {
      const identifier = path.scope.generateUidIdentifier(nameHint);
      importDeclaration.pushContainer(
        "specifiers",
        t.importSpecifier(identifier, t.identifier(name))
      );
      return identifier;
    }

    return t.identifier(specifier.node.local.name);
  }

  addStaticNode(node) {
    this.file.program.body.push(node);
  }

  createNode(type, start, end, ...args) {
    return {
      ...t[type](...args),
      ...getLocRange(this._code, start, end)
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
          this._code,
          message.replace(/ *\(\d+:\d+\)$/, ""),
          pos
        );
      } else {
        throw err;
      }
    }
  }
}

function remapProductionMarkoBuild(path, file) {
  const {
    hub: {
      options: { isProduction }
    }
  } = path;
  if (!isProduction) return file;
  return file.replace(/^marko\/src\//, "marko/dist/");
}

function getProgram(path) {
  if (path.isProgram()) {
    return path;
  }

  return path.findParent(parent => parent.isProgram());
}
