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
    let content = writes[i];

    if (typeof content === "object") {
      if (t.isStringLiteral(content)) {
        content = content.value;
      } else if (t.isTemplateLiteral(content)) {
        let nextIndex = i + 1;
        const exprLen = content.expressions.length;
        shiftItems(writes, nextIndex, content.quasis.length + exprLen);

        for (let j = 0; j < exprLen; j++) {
          writes[nextIndex++] = content.quasis[j].value.raw;
          writes[nextIndex++] = content.expressions[j];
        }

        writes[nextIndex] = content.quasis[exprLen].value.raw;
        continue;
      } else {
        exprs.push(content);
        strs.push(curStr);
        curStr = "";
        continue;
      }
    }

    curStr += content;
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

function shiftItems(list: unknown[], start: number, offset: number) {
  for (let i = list.length - 1; i >= start; i--) {
    list[i + offset] = list[i];
  }
}
