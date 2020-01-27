import fs from "fs";
import { ok } from "assert";
import babel from "@babel/core";
import { version } from "marko/package.json";
import corePlugin from "./babel-plugin";
import defaultOptions from "./config";
import * as taglib from "../taglib";

export { taglib };

let globalConfig = Object.assign({}, defaultOptions);
export function configure(newConfig = {}) {
  globalConfig = Object.assign({}, defaultOptions, newConfig);
}

export function compile(src, filename, options, done) {
  if (typeof options === "function") {
    done = options;
    options = null;
  }

  options = options || {};
  return _compile(src, filename, options || {}, done);
}

export function compileFile(filename, options, done) {
  if (typeof options === "function") {
    done = options;
    options = null;
  }

  options = options || {};

  if (done) {
    fs.readFile(filename, "utf8", (err, src) => {
      if (err) {
        return done(err);
      }

      _compile(src, filename, options, done);
    });
  } else {
    return _compile(fs.readFileSync(filename, "utf8"), filename, options, done);
  }
}

function _compile(src, filename, options, done) {
  ok(filename, '"filename" argument is required');
  ok(typeof filename === "string", '"filename" argument should be a string');

  const markoConfig = Object.assign({}, globalConfig);

  if (options) {
    Object.assign(markoConfig, options);
  }

  const baseBabelConfig = {
    filename: filename,
    sourceFileName: filename,
    sourceType: "module",
    sourceMaps: markoConfig.sourceMaps,
    plugins: [[corePlugin, markoConfig]]
  };

  if (markoConfig.writeVersionComment) {
    baseBabelConfig.auxiliaryCommentBefore =
      "Compiled using marko@" + version + " - DO NOT EDIT";
  }

  if (markoConfig.babelConfig) {
    Object.assign(baseBabelConfig, markoConfig.babelConfig);
  }

  const babelConfig = babel.loadPartialConfig(baseBabelConfig).options;

  if (done) {
    babel.transform(src, babelConfig, (err, result) => {
        if (err) {
            return done(err);
        }

        done(buildResult(result));
    });
  } else {
    return buildResult(babel.transformSync(src, babelConfig));
  }
}

function buildResult(babelResult) {
    const { map, code, metadata: { marko: meta } } = babelResult;
    return { map, code, meta };
}
