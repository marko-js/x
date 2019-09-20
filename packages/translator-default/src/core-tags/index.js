import fs from "fs";
import path from "path";
import { loader, lookup } from "marko/src/taglib";

const file = path.join(__dirname, "marko.json");
const lib = loader.createTaglib(file);
loader.loadTaglibFromProps(lib, JSON.parse(fs.readFileSync(file, "utf-8")));
lookup.registerTaglib(lib);
