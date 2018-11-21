import fs from "fs";
import path from "path";
import assert from "assert";
import stripAnsi from "strip-ansi";
import plugin from "../src";
import { transform } from "@babel/core";

const fixturesDir = path.join(__dirname, "fixtures");
const OUTPUT_TYPES = ["html", "vdom"];

fs.readdirSync(fixturesDir).forEach(folder => {
  if (/^[._]/.test(folder)) {
    return;
  }

  const fixtureDir = path.join(fixturesDir, folder);
  const filename = path.join(fixtureDir, "template.marko");
  const snapshotDir = path.join(fixtureDir, "snapshots");
  const source = fs.readFileSync(filename);

  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir);
  }

  describe(folder, () => {
    describe("translate", () => {
      OUTPUT_TYPES.forEach(type => {
        it(type, () => {
          snapshotTransform({
            ext: "js",
            dir: snapshotDir,
            name: `translated-${type}`,
            source,
            filename,
            config: { output: type }
          });
        });
      });
    });

    it("generate", () => {
      snapshotTransform({
        ext: "marko",
        dir: snapshotDir,
        name: `generated`,
        source,
        filename,
        config: { _parseOnly: true }
      });
    });
  });
});

function snapshotTransform({
  ext,
  dir,
  name,
  config,
  source,
  filename
}) {
  try {
    const { code } = transform(source, {
      ast: true,
      code: true,
      babelrc: false,
      configFile: false,
      sourceMaps: false,
      filename,
      sourceFileName: filename,
      plugins: [[plugin, config]]
    });

    snapshot(dir, `${name}.${ext}`, code);
  } catch (err) {
    if (err.snapshot) {
      throw err;
    }

    snapshot(
      dir,
      `${name}-error.txt`,
      stripAnsi(err.message),
      err
    );
  }
}

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
