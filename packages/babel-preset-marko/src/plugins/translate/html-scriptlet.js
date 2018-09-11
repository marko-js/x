import { replaceInRenderBody } from "../../taglib/core/util";

export default function(path) {
  const {
    node: { body }
  } = path;

  replaceInRenderBody(path, body);
}
