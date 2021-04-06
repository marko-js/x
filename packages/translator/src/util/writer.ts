import { types as t } from "@marko/compiler";
import { isOutputHTML } from "./marko-config";
import { callRuntime } from "./runtime";

export enum WalkCodes {
  Get = 33, // !
  Before = 35, // #
  After = 36, // $
  Inside = 37, // %
  Replace = 38, // &
  Out = 39,
  OutEnd = 49,
  Over = 58,
  OverEnd = 91,
  Next = 93,
  NextEnd = 126
}

enum Step {
  enter,
  exit
}

interface Writer {
  parent: Writer | undefined;
  writes: (string | t.Expression)[];
  walks: (string | t.Expression)[];
  steps: Step[];
}

type VisitCodes =
  | WalkCodes.Get
  | WalkCodes.Before
  | WalkCodes.After
  | WalkCodes.Inside
  | WalkCodes.Replace;

export function start(path: t.NodePath<any>) {
  const parent = path.state.writer;
  if (parent && isOutputHTML(path)) {
    flushBefore(path);
  }

  path.state.writer = {
    parent,
    writes: [""],
    walks: [""],
    steps: []
  };
}

export function end(path: t.NodePath<any>) {
  const writer = path.state.writer as Writer;
  visit(path);

  if (isOutputHTML(path)) {
    flushInto(path);
  }

  path.state.writer = writer.parent;
  return {
    walks: toTemplateOrStringLiteral(writer.walks),
    writes: toTemplateOrStringLiteral(writer.writes)
  };
}

export function enter(path: t.NodePath<any>) {
  (path.state.writer as Writer).steps.push(Step.enter);
}

export function exit(path: t.NodePath<any>) {
  (path.state.writer as Writer).steps.push(Step.exit);
}

export function enterShallow(path: t.NodePath<any>) {
  (path.state.writer as Writer).steps.push(Step.enter, Step.exit);
}

export function injectWalks(path: t.NodePath<any>, expr: t.Expression) {
  (path.state.writer as Writer).walks.push(expr, "");
}

export function visit(path: t.NodePath<any>, code?: VisitCodes) {
  const writer = path.state.writer as Writer;
  let walkString = "";

  if (writer.steps.length) {
    const walks: WalkCodes[] = [];
    let depth = 0;

    for (const step of writer.steps) {
      if (step === Step.enter) {
        depth++;
        walks.push(WalkCodes.Next);
      } else {
        depth--;
        if (depth >= 0) {
          // delete back to and including previous NEXT
          walks.length = walks.lastIndexOf(WalkCodes.Next);
          walks.push(WalkCodes.Over);
        } else {
          // delete back to previous OUT
          walks.length = walks.lastIndexOf(WalkCodes.Out) + 1;
          walks.push(WalkCodes.Out);
          depth = 0;
        }
      }
    }

    let current = walks[0];
    let count = 0;

    for (const walk of walks) {
      if (walk !== current) {
        walkString += nCodeString(current, count);
        current = walk;
        count = 1;
      } else {
        count++;
      }
    }

    walkString += nCodeString(current, count);
    writer.steps = [];
  }

  if (code !== undefined) {
    walkString += String.fromCharCode(code);
  }

  writer.walks[writer.walks.length - 1] += walkString;
}

export function writeTo(path: t.NodePath<any>) {
  return (
    strs: TemplateStringsArray,
    ...exprs: Array<string | t.Expression>
  ) => {
    const exprsLen = exprs.length;
    const { writes } = path.state.writer as Writer;
    writes[writes.length - 1] += strs[0];

    for (let i = 0; i < exprsLen; i++) {
      writes.push(exprs[i], strs[i + 1]);
    }
  };
}

export function consumeHTML(path: t.NodePath<any>) {
  const writer = path.state.writer as Writer;
  const result = toTemplateOrStringLiteral(writer.writes);
  writer.writes = [""];

  if (result) {
    return t.expressionStatement(callRuntime(path, "write", result));
  }
}

export function hasPendingHTML(
  path: t.NodePath<t.MarkoTag> | t.NodePath<t.Program>
) {
  const writer = path.state.writer as Writer;
  return Boolean(writer.writes.length > 1 || writer.writes[0]);
}

export function flushBefore(path: t.NodePath<any>) {
  const expr = consumeHTML(path);
  if (expr) {
    path.insertBefore(expr)[0].skip();
  }
}

export function flushInto(
  path: t.NodePath<t.MarkoTag> | t.NodePath<t.Program>
) {
  const expr = consumeHTML(path);
  if (expr) {
    if (path.isMarkoTag()) {
      path.get("body").pushContainer("body", expr)[0].skip();
    } else {
      path.pushContainer("body", expr)[0].skip();
    }
  }
}

function nCodeString(code: WalkCodes, number: number) {
  switch (code) {
    case WalkCodes.Next:
      return toCharString(number, WalkCodes.Next, WalkCodes.NextEnd);
    case WalkCodes.Over:
      return toCharString(number, WalkCodes.Over, WalkCodes.OverEnd);
    case WalkCodes.Out:
      return toCharString(number, WalkCodes.Out, WalkCodes.OutEnd);
  }
}

function toCharString(
  number: number,
  startCharCode: number,
  endCharCode: number
) {
  if (number) {
    const total = endCharCode - startCharCode + 1;
    let value = "";
    while (number > total) {
      value += String.fromCharCode(endCharCode);
      number -= total;
    }
    return value + String.fromCharCode(startCharCode + number - 1);
  }

  return "";
}

export function toTemplateOrStringLiteral(
  parts: (string | t.Expression)[]
): t.StringLiteral | t.TemplateLiteral | undefined {
  const strs: string[] = [];
  const exprs: t.Expression[] = [];
  let curStr: string = parts[0] as string;

  for (let i = 1; i < parts.length; i++) {
    let content = parts[i];

    if (typeof content === "object") {
      if (t.isStringLiteral(content)) {
        content = content.value;
      } else if (t.isTemplateLiteral(content)) {
        let nextIndex = i + 1;
        const exprLen = content.expressions.length;
        shiftItems(parts, nextIndex, content.quasis.length + exprLen);

        for (let j = 0; j < exprLen; j++) {
          parts[nextIndex++] = content.quasis[j].value.raw;
          parts[nextIndex++] = content.expressions[j] as t.Expression;
        }

        parts[nextIndex] = content.quasis[exprLen].value.raw;
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

  if (exprs.length) {
    strs.push(curStr);

    return t.templateLiteral(
      strs.map(raw => t.templateElement({ raw })),
      exprs
    );
  } else if (curStr) {
    return t.stringLiteral(curStr);
  }
}

function shiftItems(list: unknown[], start: number, offset: number) {
  for (let i = list.length - 1; i >= start; i--) {
    list[i + offset] = list[i];
  }
}
