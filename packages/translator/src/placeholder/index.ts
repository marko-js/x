import { NodePath, MarkoPlaceholder } from "@marko/babel-types";
import { isOutputHTML } from "../util/marko-config";
import translateHTML from "./html";
import translateDOM from "./dom";

export default function (path: NodePath<MarkoPlaceholder>) {
  (isOutputHTML(path) ? translateHTML : translateDOM)(path);
}
