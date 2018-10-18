import * as t from "../../definitions";

export default function(path) {
  const children = path.get("children");

  children[0].insertBefore(
    t.htmlElement(
      t.htmlStartTag(t.stringLiteral("component-globals"), [], []),
      t.htmlEndTag(t.stringLiteral("component-globals")),
      [],
      []
    )
  );

  children[children.length - 1].insertAfter(
    t.htmlElement(
      t.htmlStartTag(t.stringLiteral("init-components"), [], []),
      t.htmlEndTag(t.stringLiteral("init-components")),
      [],
      []
    )
  );
}
