import withPreviousLocation from "../util/with-previous-location";
import write from "../util/html-out-write";
import { translateAttributes } from "./attributes";

export function translateElement(path) {
  const {
    node: { startTag, children, endTag }
  } = path;
  const attributes = path.get("startTag").get("attributes");
  path.replaceWithMultiple([
    withPreviousLocation(
      write`<${startTag.name}${translateAttributes(attributes)}>`,
      startTag
    ),
    ...children,
    withPreviousLocation(write`</${endTag.name}>`, endTag)
  ]);
}
