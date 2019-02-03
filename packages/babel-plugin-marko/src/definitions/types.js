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
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  HTMLDeclaration: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  HTMLCDATA: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  HTMLComment: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  HTMLText: {
    visitor: ["value"],
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  HTMLPlaceholder: {
    visitor: ["value"],
    builder: ["value", "escape"],
    aliases: ["Marko", "Statement"],
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
    builder: ["body", "static"],
    aliases: ["Marko", "Statement"],
    fields: {
      body: {
        validate: arrayOfType(["Statement"])
      },
      static: {
        validate: assertValueType("boolean"),
        default: false
      }
    }
  },

  HTMLClass: {
    builder: ["body"],
    visitor: ["body"],
    aliases: ["Marko", "Statement"],
    fields: {
      body: {
        validate: assertNodeType("ClassBody")
      }
    }
  },

  HTMLAttribute: {
    builder: ["name", "value", "modifier", "arguments"],
    visitor: ["value"],
    aliases: ["Marko", "Expression"],
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

  HTMLTag: {
    builder: [
      "name",
      "arguments",
      "params",
      "attributes",
      "body",
      "properties"
    ],
    aliases: ["Marko", "Statement"],
    visitor: ["name", "arguments", "params", "attributes", "body"],
    fields: {
      name: {
        validate: assertNodeType("Expression")
      },
      arguments: {
        validate: chain(
          assertValueType("array"),
          assertEach(assertNodeType("Expression", "SpreadElement"))
        ),
        default: []
      },
      params: {
        ...functionCommon.params,
        default: []
      },
      attributes: {
        validate: arrayOfType(["HTMLAttribute", "HTMLSpreadAttribute"]),
        default: []
      },
      body: {
        validate: arrayOfType([
          "HTMLTag",
          "HTMLCDATA",
          "HTMLText",
          "HTMLPlaceholder",
          "HTMLScriptlet",
          "HTMLComment"
        ]),
        default: []
      },
      properties: {
        validate: arrayOfType(["ObjectProperty"]),
        default: []
      },
      handlers: {
        validate: assertEach(assertNodeType("Expression")),
        optional: true
      },
      rawValue: {
        validate: assertValueType("string"),
        optional: true
      }
    }
  }
};
