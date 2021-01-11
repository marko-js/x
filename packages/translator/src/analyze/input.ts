import { types as t, NodePath, Visitor } from "@marko/babel-types";

interface ReferenceLookup {
  [x: string]: boolean;
}

declare module "@marko/babel-types" {
  export interface ProgramExtra {
    referencedInputs: ReferenceLookup;
  }

  export interface MarkoTagExtra {
    referencedInputs: { name: ReferenceLookup };
  }

  export interface MarkoAttributeExtra {
    referencedInputs: { value: ReferenceLookup };
  }

  export interface MarkoSpreadAttributeExtra {
    referencedInputs: { value: ReferenceLookup };
  }
}

export default {
  Identifier(identifier, allReferencedInputs) {
    const { scope } = identifier;
    const { name } = identifier.node;
    if (name !== "input" || scope.hasBinding(name)) {
      return;
    }

    let curPath = identifier as NodePath<t.Node>;
    let pathKey = curPath.key;
    let memberString = "";

    loop: while ((curPath = curPath.parentPath)) {
      switch (curPath.node.type) {
        case "MemberExpression": {
          const property = (curPath as NodePath<t.MemberExpression>).get(
            "property"
          );
          if (property.isStringLiteral()) {
            memberString = `${memberString}.${property.node.value}`;
          } else if (property.isIdentifier()) {
            memberString = `${memberString}.${property.node.name}`;
          } else {
            break loop;
          }
          break;
        }
        default:
          break loop;
      }

      pathKey = curPath.key;
    }

    while (!curPath.node.type.startsWith("Marko")) {
      pathKey = curPath.key;
      curPath = curPath.parentPath;
    }

    memberString = `input${memberString}`;

    const extra = (curPath.node.extra ??= {});
    const referencedInputsByKey = (extra.referencedInputs ??= {}) as {
      [x: string]: ReferenceLookup | undefined;
    };
    const referencedInputs = (referencedInputsByKey[pathKey] ??= {});
    referencedInputs[memberString] = allReferencedInputs[memberString] = true;
  }
} as Visitor;
