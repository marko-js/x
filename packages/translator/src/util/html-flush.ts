import {
  types as t,
  MarkoTag,
  Program,
  NodePath,
  Expression
} from "@marko/babel-types";
import { callRuntime } from "./runtime";

export function flushHTML(path: NodePath<MarkoTag> | NodePath<Program>) {
  const writes = path.state.writes as Array<string | Expression> | undefined;

  if (!writes) {
    return;
  }

  path.state.writes = undefined;
  const strs: string[] = [];
  const exprs: Expression[] = [];
  let curStr: string = writes[0] as string;

  for (let i = 1; i < writes.length; i++) {
    const content = writes[i];

    if (typeof content === "string") {
      curStr += content;
    } else {
      exprs.push(content);
      strs.push(curStr);
      curStr = "";
    }
  }

  let arg: Expression | undefined;

  if (exprs.length) {
    strs.push(curStr);

    arg = t.templateLiteral(
      strs.map(raw => t.templateElement({ raw })),
      exprs
    );
  } else if (curStr) {
    arg = t.stringLiteral(curStr);
  }

  if (arg) {
    if (path.isMarkoTag()) {
      path.get("body").pushContainer("body", callRuntime(path, "write", arg));
    } else {
      path.pushContainer("body", callRuntime(path, "write", arg));
    }
  }
}
