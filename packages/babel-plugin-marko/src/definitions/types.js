import {
  assertNodeType,
  assertValueType,
  arrayOfType,
  chain,
  assertEach
} from "@babel/types/lib/definitions/utils";

import { functionCommon } from "@babel/types/lib/definitions/core";
const valueFieldCommon = {
  value: {
    validate: assertValueType("string")
  }
};

export default {
  HTMLDocumentType: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLDeclaration: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLCDATA: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLComment: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLText: {
    visitor: ["value"],
    builder: ["value"],
    aliases: ["Marko", "StringLiteral", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLPlaceholder: {
    visitor: ["value"],
    builder: ["value", "escape"],
    aliases: ["Marko", "Expression"],
    fields: {
      value: {
        validate: assertNodeType("Expression")
      },
      escape: {
        validate: assertValueType("boolean"),
        default: true
      }
    }
  },

  HTMLScriptlet: {
    visitor: ["body"],
    builder: ["body"],
    aliases: ["Marko", "BlockStatement"],
    fields: {
      body: {
        validate: arrayOfType(["Statement"])
      }
    }
  },

  HTMLAttribute: {
    builder: ["name", "value", "modifier", "arguments"],
    visitor: ["value"],
    aliases: ["Marko"],
    fields: {
      name: {
        validate: assertValueType("string")
      },
      value: {
        validate: assertNodeType("Expression"),
        optional: true
      },
      modifier: {
        validate: assertValueType("string"),
        optional: true
      },
      arguments: {
        validate: chain(
          assertValueType("array"),
          assertEach(assertNodeType("Expression", "SpreadElement"))
        ),
        optional: true
      }
    }
  },

  HTMLSpreadAttribute: {
    builder: ["value"],
    visitor: ["value"],
    aliases: ["Marko", "HTMLAttribute"],
    fields: {
      value: {
        validate: assertNodeType("Expression"),
        optional: true
      }
    }
  },

  HTMLStartTag: {
    builder: ["name", "params", "attributes", "rawValue"],
    aliases: ["Marko", "Expression"],
    fields: {
      name: {
        validate: assertNodeType("Expression")
      },
      params: {
        ...functionCommon.params,
        default: []
      },
      attributes: {
        validate: arrayOfType(["HTMLAttribute", "HTMLSpreadAttribute"]),
        default: []
      },
      rawValue: {
        validate: assertValueType("string"),
        optional: true
      },
      handlers: {
        validate: assertEach(assertNodeType("Expression")),
        optional: true
      }
    }
  },

  HTMLEndTag: {
    builder: ["name"],
    aliases: ["Marko", "Expression"],
    fields: {
      name: {
        validate: assertNodeType("Expression")
      }
    }
  },

  HTMLElement: {
    visitor: ["startTag", "endTag", "children"],
    builder: ["startTag", "endTag", "children", "properties"],
    aliases: ["Marko", "Statement"],
    fields: {
      startTag: {
        validate: assertNodeType("HTMLStartTag")
      },
      endTag: {
        validate: assertNodeType("HTMLEndTag"),
        optional: true
      },
      children: {
        validate: arrayOfType([
          "HTMLElement",
          "HTMLCDATA",
          "HTMLText",
          "HTMLPlaceholder",
          "HTMLScriptlet",
          "HTMLComment"
        ]),
        default: []
      },
      properties: {
        validate: arrayOfType(["ObjectProperty"])
      }
    }
  }
};
