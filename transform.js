const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const fixturesPath = path.join(
  __dirname,
  "packages/translator/src/__tests__/fixtures"
);
const fixtureNames = fs.readdirSync(fixturesPath);
const manualFiles = ["browser.ts"];
const manualFixtureNames = fixtureNames.filter((fixtureName) => {
  const fixturePath = path.join(fixturesPath, fixtureName);
  return manualFiles.some((file) =>
    fs.existsSync(path.join(fixturePath, file))
  );
});
const getTemplateCode = (str) =>
  str.match(/\n\/\/ <[^\n]+(\n\/\/ [^\n]+)*/)?.[0].replace(/\n\/\/ /g, "\n");

for (let i = 0; i < manualFixtureNames.length; i++) {
  const fixtureName = manualFixtureNames[i];
  const fixturePath = path.join(fixturesPath, fixtureName);
  const browserFile = fs.readFileSync(path.join(fixturePath, "browser.ts"));
  const code = getTemplateCode(browserFile.toString());
  if (code) {
    console.log("");
    console.log(fixtureName);
    console.log(code);
  }
}
