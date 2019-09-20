import path from "path";
import { types as t } from "@marko/babel-types";
import { getClientPath } from "lasso-modules-client/transport";
import { parse, parseExpression } from "@babel/parser";
import { buildLookup } from "./taglib";
import createFile from "./util/create-file";
import codeFrameError from "./util/code-frame-error";
import { getLoc, getLocRange } from "./util/get-loc";
import getComponentFiles from "./util/get-component-files";
import checksum from "./util/checksum";
import { normalizeTemplateString } from "@marko/babel-utils";

export class Hub {
  constructor(filename, code, options) {
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
      importDeclaration = _imports[file] = this.program.pushContainer(
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
      importDeclaration = _imports[file] = this.program.pushContainer(
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
    this.program.pushContainer("body", node);
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

  resolveKey(path) {
    const parentLoopKeys = getParentLoopKeys(path);
    if (!hasUserDefinedKey(path)) {
      const autoKey = path.get("key").node || this.nextKey();
      path.set(
        "key",
        parentLoopKeys.length
          ? normalizeTemplateString`${autoKey}${normalizeTemplateString(
              ["[", ...parentLoopKeys.slice(1).map(() => "]["), "]"],
              ...parentLoopKeys
            )}`
          : autoKey
      );
    }
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

function hasUserDefinedKey(path) {
  const key = path.get("key").node;
  return key && !key._autoKey;
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

function getParentLoopKeys(path) {
  return path
    .getAncestry()
    .filter(parent => {
      if (parent.isMarkoTag()) {
        const tagName = parent.get("name.value").node;
        if (tagName === "for" || tagName === "while") {
          return true;
        }
      }
    })
    .map(getLoopKey)
    .filter(Boolean)
    .reverse();
}

function getLoopKey(path) {
  if (path.get("checkedKey").node) {
    const existingIdentifier = path.get("loopKey").node;
    return existingIdentifier && t.identifier(existingIdentifier.name);
  }

  const loopBody = path.get("body.body");
  const childElements = loopBody.filter(childPath => childPath.isMarkoTag());
  const [firstElement] = childElements;
  const allKeyed = childElements.every(hasUserDefinedKey);
  path.set("checkedKey", true);

  if (allKeyed || !hasUserDefinedKey(firstElement)) {
    return;
  }

  const firstElementKey = firstElement.get("key").node;
  const keyIdentifier = path.scope.generateUidIdentifier("loopKey");
  firstElement.set("key", keyIdentifier);
  firstElement.insertBefore(
    t.variableDeclaration("const", [
      t.variableDeclarator(keyIdentifier, firstElementKey)
    ])
  );

  path.set("loopKey", keyIdentifier);

  return keyIdentifier;
}
