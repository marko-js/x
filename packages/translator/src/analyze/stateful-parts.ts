import { types as t, NodePath } from "@marko/babel-types";

declare module "@marko/babel-types" {
  export interface MarkoTagExtra {
    stateful: boolean;
    statefulTagName: boolean;
    statefulParams: boolean;
  }

  export interface MarkoAttrExtra {
    stateful: boolean;
  }

  export interface MarkoPlaceholderExtra {
    stateful: boolean;
  }
}

export function analyzeStatefulTagParts(tag: NodePath<t.MarkoTag>) {
  const { node } = tag;
  const { extra } = node;

  if (extra.tagNameDynamic && isStateful(tag.get("name"))) {
    extra.stateful = extra.statefulTagName = true;
  }

  if (tag.has("var") && isStatefulLVal(tag.get("var"))) {
    extra.stateful = extra.statefulTagName = true;
  }

  if (tag.has("params")) {
    for (const param of tag.get("params") as NodePath<t.LVal>[]) {
      if (isStatefulLVal(param)) {
        extra.stateful = extra.statefulParams = true;
      }
    }
  }

  for (const attr of tag.get("attributes") as NodePath<t.MarkoAttribute>[]) {
    if (isStateful(attr.get("value"))) {
      extra.stateful = (attr.node.extra ??= {} as typeof attr.node.extra)!.stateful = true;
    }
  }
}

export function analyzeStatefulPlaceholder(
  placeholder: NodePath<t.MarkoPlaceholder>
) {
  const { node } = placeholder;
  const { extra } = node;
  if (isStateful(placeholder.get("value"))) {
    extra.stateful = true;
  }
}

function isStateful(path: NodePath<any>) {
  const node = path.node as t.Node | undefined;

  if (!node) {
    return false;
  }

  switch (node.type) {
    case "StringLiteral":
    case "NumericLiteral":
    case "BooleanLiteral":
    case "NullLiteral":
    case "RegExpLiteral":
    case "BigIntLiteral":
    case "BreakStatement":
    case "ContinueStatement":
    case "DebuggerStatement":
    case "ThisExpression":
    case "Super":
      return false;
    case "SequenceExpression":
      return (path as NodePath<t.SequenceExpression>)
        .get("expressions")
        .some(isStateful);
    case "ArrayExpression":
      return (path as NodePath<t.ArrayExpression>)
        .get("elements")
        .some(isStatefulListMember);
    case "AssignmentExpression": {
      const assignmentPath = path as NodePath<t.AssignmentExpression>;
      return (
        isStatefulLVal(assignmentPath.get("left")) ||
        isStateful(assignmentPath.get("right"))
      );
    }
    case "ArrowFunctionExpression":
    case "FunctionExpression":
    case "FunctionDeclaration": {
      const functionPath = path as NodePath<t.Function>;
      return (
        functionPath.get("params").some(isStatefulLVal) ||
        isStatefulBody(functionPath.get("body"))
      );
    }

    case "LogicalExpression":
    case "BinaryExpression": {
      const exprPath = path as NodePath<
        t.LogicalExpression | t.BinaryExpression
      >;
      return (
        isStateful(exprPath.get("left")) || isStateful(exprPath.get("right"))
      );
    }

    case "CallExpression": {
      const callExpressionPath = path as NodePath<t.CallExpression>;
      return (
        isStateful(callExpressionPath.get("callee")) ||
        callExpressionPath.get("arguments").some(isStatefulListMember)
      );
    }

    case "ClassDeclaration":
    case "ClassExpression": {
      const classPath = path as NodePath<t.Class>;
      return (
        isStateful(classPath).get("super") ||
        classPath.get("body").get("body").some(isStatefulClassMember)
      );
    }

    case "ObjectExpression": {
      return (path as NodePath<t.ObjectExpression>)
        .get("properties")
        .some(isStatefulObjectMember);
    }

    case "IfStatement":
    case "ConditionalExpression": {
      const condPath = path as NodePath<t.ConditionalExpression>;
      return (
        isStateful(condPath.get("test")) ||
        isStateful(condPath.get("consequent")) ||
        isStateful(condPath.get("alternate"))
      );
    }

    case "DoExpression":
    case "DoWhileStatement":
    case "WhileStatement": {
      const whilePath = path as NodePath<t.DoWhileStatement>;
      return (
        isStateful(whilePath.get("test")) ||
        isStatefulBody(whilePath.get("body"))
      );
    }

    case "ExpressionStatement":
      return isStateful(
        (path as NodePath<t.ExpressionStatement>).get("expression")
      );

    case "ForInStatement":
    case "ForOfStatement": {
      const forPath = path as NodePath<t.ForInStatement | t.ForOfStatement>;
      return (
        isStatefulLVal(forPath.get("left")) ||
        isStateful(forPath.get("right")) ||
        isStatefulBody(forPath.get("body"))
      );
    }

    case "ForStatement": {
      const forPath = path as NodePath<t.ForStatement>;
      return (
        isStateful(forPath.get("init")) ||
        isStateful(forPath.get("test")) ||
        isStateful(forPath.get("update")) ||
        isStatefulBody(forPath.get("body"))
      );
    }

    case "Identifier": {
      const id = path as NodePath<t.Identifier>;
      const {
        scope,
        node: { name }
      } = id;
      const binding = scope.getBinding(name);

      if (!binding) {
        return name === "input";
      }

      if (binding.kind === "module") {
        return false;
      }

      const bindingPath = binding.path;
      const bindingTag = bindingPath.parentPath as NodePath<t.MarkoTag>;

      if (!bindingTag.isMarkoTag()) {
        // Unknown binding.
        return true;
      }

      const tagName = bindingTag.get("name") as NodePath<t.StringLiteral>;

      if (!tagName.isStringLiteral()) {
        // Unknown tagName.
        // TODO: tag name analysis could maintain a set for dynamic tags using `import`.
        return true;
      }

      if (bindingPath.key === "var") {
        switch (tagName.node.value) {
          case "const":
            // Check the default attr for const tags.
            return isStateful(
              (bindingTag.get(
                "attributes"
              )[0] as NodePath<t.MarkoAttribute>).get("value")
            );
          case "let":
            // Lets are always stateful.
            return true;
          case "get":
            // TODO: maybe look for <set>?
            return true;
          case "tag":
            // TODO: is this safe?
            return false;
          default:
            // TODO: child analysis on yields.
            return true;
        }
      }

      if (bindingPath.listKey === "params") {
        switch (tagName.node.value) {
          case "for":
            for (const attr of bindingTag.get(
              "attributes"
            ) as NodePath<t.MarkoAttribute>[]) {
              if (isStateful(attr.get("value"))) {
                return true;
              }
            }
            return false;
          default:
            // TODO: child analysis on dynamics tags with `renderBody`.
            return true;
        }
      }

      // Unknown binding.
      return true;
    }

    case "MemberExpression": {
      const memberPath = path as NodePath<t.MemberExpression>;
      return (
        (memberPath.node.computed && isStateful(memberPath.get("property"))) ||
        isStateful(memberPath.get("object"))
      );
    }

    case "BindExpression": {
      const bindPath = path as NodePath<t.BindExpression>;
      return (
        isStateful(bindPath.get("object")) || isStateful(bindPath.get("callee"))
      );
    }

    case "LabeledStatement":
      return isStatefulBody((path as NodePath<t.LabeledStatement>).get("body"));
    case "NewExpression": {
      const newExprPath = path as NodePath<t.NewExpression>;
      return (
        isStateful(newExprPath.get("callee")) ||
        newExprPath.get("arguments").some(isStatefulListMember)
      );
    }

    case "UnaryExpression":
    case "UpdateExpression":
    case "SpreadElement":
    case "ReturnStatement":
    case "AwaitExpression":
    case "ThrowStatement":
    case "YieldExpression":
      return isStateful(
        (path as NodePath<
          | t.UnaryExpression
          | t.UpdateExpression
          | t.SpreadElement
          | t.ReturnStatement
          | t.AwaitExpression
          | t.ThrowStatement
          | t.YieldExpression
        >).get("argument")
      );

    case "SwitchStatement": {
      const switchPath = path as NodePath<t.SwitchStatement>;

      if (isStateful(switchPath.get("discriminant"))) {
        return true;
      }

      for (const casePath of switchPath.get("cases")) {
        if (
          isStateful(casePath.get("test")) ||
          casePath.get("consequent").some(isStateful)
        ) {
          return true;
        }
      }

      return false;
    }

    case "TaggedTemplateExpression": {
      const taggedTemplatePath = path as NodePath<t.TaggedTemplateExpression>;
      return (
        isStateful(taggedTemplatePath.get("tag")) ||
        isStateful(taggedTemplatePath.get("quasi"))
      );
    }

    case "TemplateLiteral":
      return (path as NodePath<t.TemplateLiteral>)
        .get("expressions")
        .some(isStateful);

    case "TryStatement": {
      const tryPath = path as NodePath<t.TryStatement>;
      const catchPath = tryPath.get("handler") as NodePath<t.CatchClause>;
      const finallyPath = tryPath.get(
        "finalizer"
      ) as NodePath<t.BlockStatement>;

      return (
        tryPath.get("block").get("body").some(isStateful) ||
        (catchPath.node &&
          (isStatefulLVal(catchPath.get("param")) ||
            catchPath.get("body").get("body").some(isStateful))) ||
        (finallyPath.node && finallyPath.get("body").some(isStateful))
      );
    }

    case "VariableDeclaration": {
      const varPath = path as NodePath<t.VariableDeclaration>;
      for (const decl of varPath.get("declarations")) {
        if (isStatefulLVal(decl.get("id")) || isStateful(decl.get("init"))) {
          return true;
        }
      }

      return false;
    }

    case "WithStatement": {
      const withPath = path as NodePath<t.WithStatement>;
      return (
        isStateful(withPath.get("object")) ||
        isStatefulBody(withPath.get("body"))
      );
    }

    default:
      return true;
  }
}

function isStatefulLVal(path: NodePath<any>) {
  switch ((path.node as t.LVal).type) {
    case "Identifier":
      return false;
    case "ArrayPattern":
      return (path as NodePath<t.ArrayPattern>)
        .get("elements")
        .some(isStatefulLVal);
    case "AssignmentPattern": {
      const assignmentPath = path as NodePath<t.AssignmentPattern>;
      return (
        isStatefulLVal(assignmentPath.get("left")) ||
        isStateful(assignmentPath.get("right"))
      );
    }
    case "ObjectPattern": {
      const objectPatternPath = path as NodePath<t.ObjectPattern>;

      for (const prop of objectPatternPath.get("properties")) {
        if (
          prop.isObjectProperty() &&
          isStatefulLVal((prop as NodePath<t.ObjectProperty>).get("value"))
        ) {
          return true;
        }
      }

      return false;
    }
    case "RestElement":
      return isStatefulLVal((path as NodePath<t.RestElement>).get("argument"));

    default:
      return true;
  }
}

function isStatefulListMember(path: NodePath<any>) {
  return (
    (path.node.type === "SpreadElement" &&
      isStateful((path as NodePath<t.SpreadElement>).get("argument"))) ||
    isStateful(path)
  );
}

function isStatefulObjectMember(path: NodePath<any>) {
  switch ((path.node as t.Node).type) {
    case "ObjectMethod": {
      const methodPath = path as NodePath<t.ObjectMethod>;
      return (
        (methodPath.node.computed && isStateful(methodPath.get("key"))) ||
        methodPath.get("params").some(isStatefulLVal) ||
        methodPath.get("body").get("body").some(isStateful)
      );
    }

    case "ObjectProperty": {
      const propPath = path as NodePath<t.ObjectProperty>;
      return (
        (propPath.node.computed && isStateful(propPath.get("key"))) ||
        isStateful(propPath.get("value"))
      );
    }

    case "SpreadElement":
      return isStateful((path as NodePath<t.SpreadElement>).get("argument"));

    default:
      return true;
  }
}

function isStatefulClassMember(path: NodePath<t.ClassBody["body"][0]>) {
  switch (path.node.type) {
    case "ClassPrivateMethod":
    case "ClassMethod": {
      const methodPath = path as NodePath<t.ClassMethod | t.ClassPrivateMethod>;
      return (
        (methodPath.node.computed && isStateful(methodPath.get("key"))) ||
        methodPath.get("params").some(isStatefulLVal) ||
        methodPath.get("body").get("body").some(isStateful)
      );
    }

    case "ClassPrivateProperty":
    case "ClassProperty": {
      const propPath = path as NodePath<t.ClassProperty>;
      return (
        (propPath.node.computed && isStateful(propPath.get("key"))) ||
        isStateful(propPath.get("value"))
      );
    }

    default:
      return true;
  }
}

function isStatefulBody(path: NodePath<any>): boolean {
  if (path.isBlockStatement()) {
    return (path as NodePath<t.BlockStatement>).get("body").some(isStateful);
  }

  return isStateful(path);
}
