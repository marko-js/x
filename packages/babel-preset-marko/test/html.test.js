import fs from "fs";
import path from "path";
import assert from "assert";
import stripAnsi from "strip-ansi";
import plugin from "../src";
import { transform } from "@babel/core";

// TODO: error snapshots.

const fixturesDir = path.join(__dirname, "fixtures-html");

fs.readdirSync(fixturesDir).forEach(folder => {
  if (/^[._]/.test(folder)) {
    return;
  }

  const fixtureDir = path.join(fixturesDir, folder);
  const sourceFile = path.join(fixtureDir, "template.marko");

  it(folder, () => {
    const source = fs.readFileSync(sourceFile);

    try {
      const { code } = transform(source, {
        ast: true,
        code: true,
        babelrc: false,
        configFile: false,
        sourceMaps: false,
        filename: sourceFile,
        sourceFileName: sourceFile,
        plugins: [[plugin, { output: "html" }]]
      });

      snapshot(fixtureDir, "code.js", code);
    } catch (err) {
      if (err.snapshot) {
        throw err;
      }

      snapshot(fixtureDir, "error.txt", stripAnsi(err.message), err);
    }
  });
});

function snapshot(dir, file, data, originalError) {
  let { name, ext } = path.parse(file);
  if (name) name += ".";
  const expectedFile = path.join(dir, `${name}expected${ext}`);
  const actualFile = path.join(dir, `${name}actual${ext}`);

  fs.writeFileSync(actualFile, data, "utf-8");

  if (process.env.UPDATE_EXPECTATIONS) {
    fs.writeFileSync(expectedFile, data, "utf-8");
  } else {
    const expected = fs.existsSync(expectedFile)
      ? fs.readFileSync(expectedFile, "utf-8")
      : "";

    try {
      assert.equal(data, expected);
    } catch (err) {
      err.snapshot = true;
      err.name = err.name.replace(" [ERR_ASSERTION]", "");
      err.message = `${path.relative(process.cwd(), actualFile)}\n\n${
        err.message
      }`;

      throw originalError || err;
    }
  }
}
