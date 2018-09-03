import path from "path";
import { createParser } from "htmljs-parser";
import { buildLookup } from "./taglib";
import * as t from "./definitions";
import createFile from "./util/create-file";
import { getLocRange } from "./util/get-loc";
import codeFrameError from "./util/code-frame-error";

export function parse({
  code,
  filename,
  htmlParserOpts,
  parse,
  parseExpression
}) {
  const lookup = buildLookup(path.dirname(filename));
  const createNode = (type, start, end, ...args) =>
    Object.assign(type(...args), getLocRange(code, start, end));
  const createError = (...args) => codeFrameError(filename, code, ...args);
  const preserveWhitespace =
    htmlParserOpts && htmlParserOpts.preserveWhitespace;
  const file = {
    lookup,
    parse,
    parseExpression,
    ...createFile(filename, code)
  };
  const { program } = file;
  const { body } = program;
  const stack = [{ context: body }];
  let preservingWhitespace = preserveWhitespace;
  let wasSelfClosing = false;
  let context = body;

  const htmlParser = createParser(
    {
      onDocumentType({ value, pos, endPos }) {
        context.push(createNode(t.htmlDocumentType, pos, endPos, value));
      },

      onDeclaration({ value, pos, endPos }) {
        context.push(createNode(t.htmlDeclaration, pos, endPos, value));
      },

      onComment({ value, pos, endPos }) {
        context.push(createNode(t.htmlComment, pos, endPos, value));
      },

      onCDATA({ value, pos, endPos }) {
        context.push(createNode(t.htmlCDATA, pos, endPos, value));
      },

      onText({ value }, { pos }) {
        if (!preservingWhitespace) {
          // TODO: don't trim between adjacent text nodes.
          value = value.trim();
          if (value === "") {
            return;
          } else {
            pos = value.indexOf(value);
          }
        }

        const endPos = pos + value.length;
        context.push(createNode(t.htmlText, pos, endPos, value));
      },

      onPlaceholder({ escape, value, withinBody, pos, endPos }) {
        if (withinBody) {
          context.push(
            createNode(
              t.htmlPlaceholder,
              pos,
              endPos,
              parseExpression(value, pos + (escape ? 2 /* ${ */ : 3) /* $!{ */),
              escape
            )
          );
        }
      },

      onScriptlet({ value, line, block, pos, endPos }) {
        if (!line && !block) {
          throw createError("Scriptlets are no longer supported.", pos, endPos);
        }

        context.push(
          createNode(t.HTMLScriptlet, pos, endPos, parse(value, pos).body)
        );
      },

      onOpenTagName(event) {
        const tagDef = lookup.getTag(event.tagName);
        if (!tagDef) return;

        const { parseOptions } = tagDef;
        if (!parseOptions) return;

        event.setParseOptions(parseOptions);

        if ("preserveWhitespace" in parseOptions) {
          preservingWhitespace = parseOptions.preserveWhitespace;
        }
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
        const tagDef = !tagNameExpression && lookup.getTag(tagName);
        let rawValue;
        let params;
        wasSelfClosing = selfClosed;

        if (tagNameExpression) {
          tagName = parseExpression(tagNameExpression, pos + 2 /* ${ */);
        } else {
          tagName = createNode(t.stringLiteral, pos, tagNameEndPos, tagName);
        }

        if (tagDef && tagDef.parseOptions && tagDef.parseOptions.rawOpenTag) {
          rawValue = parser.substring(pos, endPos).replace(/^<|\/>$|>$/g, "");
          attributes = [];
        } else {
          if (argument) {
            params = parseExpression(`(${argument.value})=>{}`, argument.pos)
              .params;
          }

          let attrEndPos = tagNameEndPos;
          attributes = attributes.map(attr => {
            const attrStartPos = code.indexOf(attr.name, attrEndPos);
            attrEndPos = attr.endPos;

            if (attr.name.slice(0, 3) === "...") {
              const value = parseExpression(
                attr.name.slice(3),
                attrStartPos + 3
              );
              // TODO: Inline merge object literals.
              return createNode(
                t.htmlSpreadAttribute,
                attrStartPos,
                attrEndPos,
                value
              );
            } else {
              const attrDef = tagDef && tagDef.getAttribute(attr.name);
              if (attrDef) {
                // Todo allow parse options in attr defs.
                // Also transforms.
                const { parseOptions = {} } = attrDef;
                if (parseOptions.html) event.setParseOptions(parseOptions.html);
                if (parseOptions.preserveWhitespace)
                  preservingWhitespace = parseOptions.preserveWhitespace;
              }
            }

            let value;

            if (attr.value) {
              const valueStart = attr.pos + 1; // Add one to account for "=".
              const rawValue = code.slice(valueStart, attrEndPos);
              value = parseExpression(rawValue, valueStart);
            } else {
              value = t.booleanLiteral(true);
            }

            return createNode(
              t.htmlAttribute,
              attrStartPos,
              attrEndPos,
              attr.name,
              value
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
              createNode(
                t.htmlAttribute,
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
            throw createError(
              "Cannot have shorthand id and id attribute.",
              pos,
              tagNameEndPos
            );
          }

          attributes.unshift(
            createNode(
              t.htmlAttribute,
              pos,
              tagNameEndPos,
              "id",
              t.stringLiteral(shorthandId.value.slice(1, -1))
            )
          );
        }

        stack.push({
          startTag: createNode(
            t.htmlStartTag,
            pos,
            endPos,
            tagName,
            params,
            attributes,
            rawValue
          ),
          context: (context = [])
        });
      },

      onCloseTag({ tagName, pos, endPos }, parser) {
        preservingWhitespace = preserveWhitespace;

        const { startTag, context: children } = stack.pop();
        context = stack[stack.length - 1].context;

        if (!pos) pos = parser.pos;
        if (!endPos) endPos = pos;

        if (!startTag) {
          throw createError(
            `Missing closing tag around ${tagName}.`,
            pos,
            endPos
          );
        }

        if (tagName) {
          if (t.isStringLiteral(startTag.name)) {
            if (startTag.name.value !== tagName) {
              throw createError(`Invalid closing tag ${tagName}.`, pos, endPos);
            }
          } else if (!wasSelfClosing) {
            throw createError(
              `Invalid ending for dynamic tag ${tagName}.`,
              pos,
              endPos
            );
          }
        }

        const endTag = createNode(t.htmlEndTag, pos, endPos, startTag.name);

        context.push(
          createNode(
            t.htmlElement,
            startTag.start,
            endTag.end,
            startTag,
            endTag,
            children,
            {}
          )
        );
      },

      onError({ message, pos, endPos }) {
        throw createError(message, pos, endPos);
      }
    },
    {
      ...htmlParserOpts,
      reflectiveAttributes: true
    }
  );

  htmlParser.parse(code, filename);
  return file;
}
