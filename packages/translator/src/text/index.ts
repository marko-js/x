import { NodePath, MarkoText } from "@marko/babel-types";
import { isOutputHTML } from "../util/marko-config";
import translateHTML from "./html";
import translateDOM from "./dom";

export default function (path: NodePath<MarkoText>) {
  (isOutputHTML(path) ? translateHTML : translateDOM)(path);
}
