import { replaceInRenderBody } from "./util";

export default function(path) {
  const { node } = path;
  const { children } = node;

  replaceInRenderBody(path, children);
}
