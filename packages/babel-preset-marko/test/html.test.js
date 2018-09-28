import fs from "fs";
import path from "path";
import assert from "assert";
import plugin from "../src";
import { transform } from "@babel/core";

const fixturesDir = path.join(__dirname, "fixtures-html");

fs.readdirSync(fixturesDir).forEach(folder => {
  if (/^[._]/.test(folder)) {
    return;
  }

  const fixtureDir = path.join(fixturesDir, folder);
  const sourceFile = path.join(fixtureDir, "template.marko");
  const expectedFile = path.join(fixtureDir, "expected.js");
  const actualFile = path.join(fixtureDir, "actual.js");
  it(folder, () => {
    const source = fs.readFileSync(sourceFile);
    const { code: actual } = transform(source, {
      ast: true,
      code: true,
      babelrc: false,
      configFile: false,
      sourceMaps: false,
      filename: sourceFile,
      sourceFileName: sourceFile,
      plugins: [[plugin, { configured: true }]]
    });

    fs.writeFileSync(actualFile, actual, "utf-8");

    if (process.env.UPDATE_EXPECTATIONS) {
      fs.writeFileSync(expectedFile, actual, "utf-8");
    } else {
      if (fs.existsSync(expectedFile)) {
        const expected = fs.readFileSync(expectedFile, "utf-8");
        assert.equal(actual, expected);
      } else {
        assert.equal(actual, "");
      }
    }
  });
});
