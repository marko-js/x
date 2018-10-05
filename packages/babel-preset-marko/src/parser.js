import { createParser } from "htmljs-parser";
import * as t from "./definitions";
const EMPTY_OBJECT = {};

export function parse(hub) {
  const { code, filename, htmlParseOptions = {} } = hub;
  const { preserveWhitespace } = htmlParseOptions;
  const stack = [{ context: hub.file.program.body }];
  let preservingWhitespaceUntil = preserveWhitespace;
  let context = stack[0].context;
  let wasSelfClosing = false;

  createParser(
    {
      onDocumentType({ value, pos, endPos }) {
        context.push(hub.createNode("htmlDocumentType", pos, endPos, value));
      },

      onDeclaration({ value, pos, endPos }) {
        context.push(hub.createNode("htmlDeclaration", pos, endPos, value));
      },

      onComment({ value, pos, endPos }) {
        context.push(hub.createNode("htmlComment", pos, endPos, value));
      },

      onCDATA({ value, pos, endPos }) {
        context.push(hub.createNode("htmlCDATA", pos, endPos, value));
      },

      onText({ value }, { pos }) {
        if (!preservingWhitespaceUntil) {
          value = value.trim().replace(/\s+/g, " ");
          if (value === "") {
            return;
          } else {
            pos = value.indexOf(value);
          }
        }

        const endPos = pos + value.length;
        context.push(hub.createNode("htmlText", pos, endPos, value));
      },

      onPlaceholder({ escape, value, withinBody, pos, endPos }) {
        if (withinBody) {
          context.push(
            hub.createNode(
              "htmlPlaceholder",
              pos,
              endPos,
              hub.parseExpression(
                value,
                pos + (escape ? 2 /* ${ */ : 3) /* $!{ */
              ),
              escape
            )
          );
        }
      },

      onScriptlet({ value, line, block, pos, endPos }) {
        if (!line && !block) {
          throw hub.buildError(
            { start: pos, end: endPos },
            "Scriptlets are no longer supported."
          );
        }

        context.push(
          hub.createNode(
            "HTMLScriptlet",
            pos,
            endPos,
            hub.parse(value, pos).body
          )
        );
      },

      onOpenTagName(event) {
        const { tagName, tagNameExpression, pos, endPos } = event;
        const tagDef = !tagNameExpression && hub.lookup.getTag(tagName);

        if (tagDef) {
          const { parseOptions } = tagDef;
          if (parseOptions) {
            event.setParseOptions(parseOptions);

            if (parseOptions.rootOnly && stack.length !== 1) {
              throw hub.buildError(
                { start: pos, end: endPos },
                `"${tagName}" tags must be at the root of your Marko template.`
              );
            }
          }
        }

        stack.push({ tagDef });
      },

      onOpenTag(event, parser) {
        let {
          tagName,
          tagNameExpression,
          argument,
          attributes,
          pos,
          endPos,
          tagNameEndPos,
          selfClosed,
          shorthandId,
          shorthandClassNames
        } = event;
        const curElement = stack[stack.length - 1];
        const { tagDef } = curElement;
        const parseOptions = (tagDef && tagDef.parseOptions) || EMPTY_OBJECT;
        let rawValue;
        let params;
        wasSelfClosing = selfClosed;

        if (tagNameExpression) {
          tagName = hub.parseExpression(tagNameExpression, pos + 2 /* ${ */);
        } else {
          tagName = hub.createNode(
            "stringLiteral",
            pos,
            tagNameEndPos,
            tagName
          );
        }

        if (parseOptions.rawOpenTag) {
          rawValue = parser.substring(pos, endPos).replace(/^<|\/>$|>$/g, "");
          attributes = [];
        } else {
          if (argument) {
            params = hub.parseExpression(
              `(${argument.value})=>{}`,
              argument.pos
            ).params;
          }

          let attrEndPos = tagNameEndPos;
          attributes = attributes.map(attr => {
            const attrStartPos = code.indexOf(attr.name, attrEndPos);
            attrEndPos = attr.endPos;

            if (attr.name.slice(0, 3) === "...") {
              const value = hub.parseExpression(
                attr.name.slice(3),
                attrStartPos + 3
              );
              // TODO: Inline merge object literals.
              return hub.createNode(
                "htmlSpreadAttribute",
                attrStartPos,
                attrEndPos,
                value
              );
            }

            let value;
            let [, modifier] = /:(.*)$/.exec(attr.name) || EMPTY_OBJECT;

            if (modifier) {
              attr.name = attr.name.slice(
                0,
                attr.name.length - modifier.length - 1
              );
            }

            if (attr.argument) {
              if (attr.value) {
                throw hub.buildError(
                  { start: attr.pos },
                  "Cannot have both attribute arguments and a value."
                );
              }

              if (attr.argument.value === "") {
                attr.argument = undefined;
              } else {
                attr.argument = hub.parseExpression(
                  `_(${attr.argument.value})`,
                  attr.argument.pos
                ).arguments;
              }
            }

            if (attr.value) {
              const valueStart = attr.pos + 1; // Add one to account for "=".
              const rawValue = code.slice(valueStart, attrEndPos);
              value = hub.parseExpression(rawValue, valueStart);
            } else {
              value = t.booleanLiteral(true);
            }

            return hub.createNode(
              "htmlAttribute",
              attrStartPos,
              attrEndPos,
              attr.name,
              value,
              modifier,
              attr.argument
            );
          });
        }

        if (shorthandClassNames) {
          let classAttr = attributes.find(({ name }) => name === "class");
          const classes = shorthandClassNames
            .map(({ value }) => value.slice(1, -1))
            .join(" ");

          if (!classAttr) {
            attributes.unshift(
              hub.createNode(
                "htmlAttribute",
                pos,
                tagNameEndPos,
                "class",
                t.stringLiteral(classes)
              )
            );
          } else {
            if (t.isStringLiteral(classAttr.value)) {
              classAttr.value = t.stringLiteral(
                classAttr.value.value
                  ? `${classes} ${classAttr.value.value}`
                  : classes
              );
            } else {
              classAttr.value = t.arrayExpression([
                t.stringLiteral(classes),
                classAttr.value
              ]);
            }
          }
        }

        if (shorthandId) {
          if (attributes.some(({ name }) => name === "id")) {
            throw hub.buildError(
              { start: pos, end: tagNameEndPos },
              "Cannot have shorthand id and id attribute."
            );
          }

          attributes.unshift(
            hub.createNode(
              "htmlAttribute",
              pos,
              tagNameEndPos,
              "id",
              t.stringLiteral(shorthandId.value.slice(1, -1))
            )
          );
        }

        curElement.startTag = hub.createNode(
          "htmlStartTag",
          pos,
          endPos,
          tagName,
          params,
          attributes,
          rawValue
        );
        curElement.context = context = [];

        if (!preservingWhitespaceUntil && parseOptions.preserveWhitespace) {
          preservingWhitespaceUntil = curElement.startTag;
        }
      },

      onCloseTag(event, parser) {
        let { tagName, pos, endPos } = event;
        const { tagDef, startTag, context: children } = stack.pop();
        context = stack[stack.length - 1].context;

        if (preservingWhitespaceUntil === startTag) {
          preservingWhitespaceUntil = preserveWhitespace;
        }

        if (!pos) event.pos = pos = parser.pos;
        if (!endPos) event.endPos = endPos = pos;

        if (!startTag) {
          throw hub.buildError(
            { start: pos, end: endPos },
            `Missing closing tag around ${tagName}.`
          );
        }

        if (tagName) {
          if (t.isStringLiteral(startTag.name)) {
            if (startTag.name.value !== tagName) {
              throw hub.buildError(
                { start: pos, end: endPos },
                `Invalid closing tag ${tagName}.`
              );
            }
          } else if (!wasSelfClosing) {
            throw hub.buildError(
              { start: pos, end: endPos },
              `Invalid ending for dynamic tag ${tagName}.`
            );
          }
        }

        const endTag = hub.createNode("htmlEndTag", pos, endPos, startTag.name);
        const htmlElement = hub.createNode(
          "htmlElement",
          startTag.start,
          endTag.end,
          startTag,
          endTag,
          children,
          {}
        );

        if (tagDef && tagDef.nodeFactoryPath) {
          const module = require(tagDef.nodeFactoryPath);
          const { default: fn = module } = module;
          context.push(...[].concat(fn(hub.createNodePath(htmlElement))));
          return;
        } else {
          context.push(htmlElement);
        }
      },

      onError({ message, pos, endPos }) {
        if (message.includes("EOF")) endPos = pos;
        throw hub.buildError({ start: pos, end: endPos }, message);
      }
    },
    {
      reflectiveAttributes: true,
      ...htmlParseOptions
    }
  ).parse(code, filename);

  return hub.file;
}
