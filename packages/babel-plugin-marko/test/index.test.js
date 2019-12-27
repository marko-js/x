import "it-fails";
import fs from "fs";
import path from "path";
import assert from "assert";
import stripAnsi from "strip-ansi";
import plugin from "../src";
import { transform } from "@babel/core";

const OUTPUT_TYPES = ["html", "dom"];
const packagesDir = path.join(__dirname, "../../");

fs.readdirSync(packagesDir)
  .map(dir => /^translator-(.*)|/.exec(dir)[1])
  .filter(name => name === "default")
  .filter(Boolean)
  .forEach(translator => {
    const fixturesDir = path.join(
      packagesDir,
      `translator-${translator}`,
      "test",
      "fixtures"
    );

    describe(`translator: ${translator}`, () => {
      fs.readdirSync(fixturesDir).forEach(folder => {
        if (/^[._]/.test(folder)) {
          return;
        }

        const fixtureDir = path.join(fixturesDir, folder);
        const snapshotDir = path.join(fixtureDir, "snapshots");
        const testConfigFile = path.join(fixtureDir, "test.js");
        const testConfig = fs.existsSync(testConfigFile)
          ? require(testConfigFile)
          : {};
        const fails = testConfig.fails || {};
        const filename = path.join(
          fixtureDir,
          testConfig.templateFile || "template.marko"
        );
        const source = fs.readFileSync(filename);

        if (!fs.existsSync(snapshotDir)) {
          fs.mkdirSync(snapshotDir);
        }

        describe(folder, () => {
          describe("output", () => {
            OUTPUT_TYPES.forEach(type => {
              const translateFailDesc =
                fails.translate && fails.translate[type];
              const translateTestFn = translateFailDesc ? it.fails : it;
              const translateMochaTest = translateTestFn(type, () => {
                snapshotTransform({
                  ext: "js",
                  dir: snapshotDir,
                  name: `translated-${type}`,
                  source,
                  filename,
                  config: { translator, output: type }
                });
              });

              if (translateFailDesc) {
                translateMochaTest.description = translateFailDesc;
              }
            });
          });

          const generateFailDesc = fails.generate;
          const generateTestFn = generateFailDesc ? it.fails : it;
          const generateMochaTest = generateTestFn("generate", () => {
            snapshotTransform({
              ext: "marko",
              dir: snapshotDir,
              name: `generated`,
              source,
              filename,
              config: { translator, _parseOnly: true }
            });
          });

          if (generateFailDesc) {
            generateMochaTest.description = generateFailDesc;
          }
        });
      });
    });
  });

function snapshotTransform({ ext, dir, name, config, source, filename }) {
  try {
    const result = transform(source, {
      ast: true,
      code: true,
      babelrc: false,
      configFile: false,
      sourceMaps: false,
      filename,
      sourceFileName: filename,
      plugins: ["@babel/plugin-proposal-class-properties", [plugin, config]]
    });

    snapshot(dir, `${name}.${ext}`, result.code);
  } catch (err) {
    if (err.snapshot) {
      throw err;
    }

    snapshot(dir, `${name}-error.txt`, stripCwd(stripAnsi(err.message)), err);
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

      if (originalError) {
        err.stack = originalError.stack;
      }

      throw err;
    }
  }
}

function stripCwd(message) {
  return message.replace(process.cwd() + "/", "");
}
