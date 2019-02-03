import * as t from "../../../definitions";
import { replaceInRenderBody, assertNoArgs } from "../../../taglib/core/util";
import { getAttrs } from "./util";

export default function(path, tagIdentifier) {
  assertNoArgs(path);
  // TODO: look into macro keying.
  replaceInRenderBody(
    path,
    t.callExpression(tagIdentifier, [getAttrs(path), t.identifier("out")])
  );
}
