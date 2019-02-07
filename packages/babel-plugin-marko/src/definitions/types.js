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
  MarkoDocumentType: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  MarkoDeclaration: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  MarkoCDATA: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  MarkoComment: {
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  MarkoText: {
    visitor: ["value"],
    builder: ["value"],
    aliases: ["Marko", "Statement"],
    fields: { ...valueFieldCommon }
  },

  MarkoPlaceholder: {
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

  MarkoScriptlet: {
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

  MarkoClass: {
    builder: ["body"],
    visitor: ["body"],
    aliases: ["Marko", "Statement"],
    fields: {
      body: {
        validate: assertNodeType("ClassBody")
      }
    }
  },

  MarkoStyle: {
    builder: ["value", "language"],
    aliases: ["Marko", "Statement"],
    fields: {
      value: {
        validate: assertValueType("string")
      },
      language: {
        validate: assertValueType("string"),
        default: "css"
      }
    }
  },

  MarkoAttribute: {
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

  MarkoSpreadAttribute: {
    builder: ["value"],
    visitor: ["value"],
    aliases: ["Marko", "MarkoAttribute"],
    fields: {
      value: {
        validate: assertNodeType("Expression"),
        optional: true
      }
    }
  },

  MarkoTag: {
    builder: [
      "name",
      "attributes",
      "body",
      "params",
      "arguments",
      "properties",
      "runtimeFlags"
    ],
    aliases: ["Marko", "Statement"],
    visitor: ["name", "arguments", "params", "attributes", "body"],
    fields: {
      name: {
        validate: assertNodeType("Expression")
      },
      attributes: {
        validate: arrayOfType(["MarkoAttribute", "MarkoSpreadAttribute"]),
        default: []
      },
      body: {
        validate: arrayOfType([
          "MarkoTag",
          "MarkoCDATA",
          "MarkoText",
          "MarkoPlaceholder",
          "MarkoScriptlet",
          "MarkoComment"
        ]),
        default: []
      },
      params: {
        ...functionCommon.params,
        default: []
      },
      arguments: {
        validate: chain(
          assertValueType("array"),
          assertEach(assertNodeType("Expression", "SpreadElement"))
        ),
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
      },
      runtimeFlags: {
        validate: assertValueType("number"),
        default: 0
      }
    }
  }
};
