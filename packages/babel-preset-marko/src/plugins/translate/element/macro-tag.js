import * as t from "../../../definitions";
import { replaceInRenderBody } from "../../../taglib/core/util";
import { getAttrs } from "./util";

export default function(path, tagIdentifier) {
  // TODO: look into macro keying.
  replaceInRenderBody(
    path,
    t.callExpression(tagIdentifier, [getAttrs(path), t.identifier("out")])
  );
}
