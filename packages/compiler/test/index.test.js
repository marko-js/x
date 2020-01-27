import "it-fails";
import fs from "fs";
import path from "path";
import autotest from "mocha-autotest";
import stripAnsi from "strip-ansi";
import plugin from "../src";
import { transform } from "@babel/core";

fs.readdirSync(path.join(__dirname, "../../"))
  .map(dir => /^translator-(.*)|/.exec(dir)[1])
  .filter(name => name === "default") // comment this out to run fluurt tests
  .forEach(translator => {
    autotest(path.normalize(`../../translator-${translator}/test/fixtures`), {
      html: runTest({ output: "html" }),
      vdom: runTest({ output: "dom" }),
      generated: runTest({ _parseOnly: true })
    });

    function runTest(config) {
      return ({ mode, test, resolve, snapshot }) => {
        const testConfigFile = resolve("test.js");
        const testConfig = fs.existsSync(testConfigFile)
          ? require(testConfigFile)
          : {};
        const templateFile = resolve(
          testConfig.templateFile || "template.marko"
        );
        const templateSource = fs.readFileSync(templateFile);
        const transformConfig = {
          ast: true,
          code: true,
          babelrc: false,
          configFile: false,
          sourceMaps: false,
          filename: templateFile,
          sourceFileName: templateFile,
          plugins: [
            "@babel/plugin-proposal-class-properties",
            [
              plugin,
              {
                translator,
                ...config
              }
            ]
          ]
        };

        test(() => {
          let output;
          try {
            output = transform(templateSource, transformConfig).code;
          } catch (err) {
            try {
              snapshot(stripCwd(stripAnsi(err.message)), {
                name: `${mode}-error`,
                ext: ".txt"
              });
              return;
            } catch {
              throw err;
            }
          }

          snapshot(output, {
            name: mode,
            ext: mode === "generated" ? ".marko" : ".js"
          });
        });
      };
    }
  });

function stripCwd(message) {
  return message.replace(process.cwd() + "/", "");
}
