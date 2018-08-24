import fs from "fs";
import path from "path";
import plugin from "../src/plugin";
import { expect } from "chai";
import { transform } from "@babel/core";

const fixtureDirectory = path.join(__dirname, "fixtures");

fs.readdirSync(fixtureDirectory).forEach(sourceFileName => {
  if (sourceFileName.endsWith(".marko")) {
    const testName = sourceFileName.replace(".marko", "");
    const sourceFile = path.join(fixtureDirectory, sourceFileName);
    const expectedFile = path.join(fixtureDirectory, testName + ".expected.js");
    const actualFile = path.join(fixtureDirectory, testName + ".actual.js");
    it(testName, () => {
      const source = fs.readFileSync(sourceFile);
      const { code: actual } = transform(source, {
        ast: true,
        code: true,
        babelrc: false,
        configFile: false,
        sourceMaps: "inline",
        sourceFileName: sourceFile,
        plugins: [plugin]
      });

      fs.writeFileSync(actualFile, actual, "utf-8");

      if (process.env.UPDATE_EXPECTATIONS) {
        fs.writeFileSync(expectedFile, actual, "utf-8");
      } else {
        if (fs.existsSync(expectedFile)) {
          const expected = fs.readFileSync(expectedFile, "utf-8");
          expect(actual).to.equal(expected);
        } else {
          expect(actual).to.equal("");
        }
      }
    });
  }
});
