import path from "path";
import { loader } from "marko/src/taglib";

export default ["core"].map(name =>
  loader.loadTaglibFromFile(path.join(__dirname, name, "marko.json"))
);
