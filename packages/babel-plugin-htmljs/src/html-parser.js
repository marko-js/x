import * as t from "./definitions";
import toCamel from "camelcase";
import { createParser } from "htmljs-parser";
import { getLocRange } from "./util/get-loc";
import codeFrameError from "./util/code-frame-error";
import createFile from "./util/create-file";
import * as translators from "./translators";
const tagTranslators = translators.html.tag;
const directiveTranslators = translators.html.directive;

export function parse({
  code,
  filename,
  htmlParserOpts,
  parse,
  parseExpression
}) {
  const createNode = (type, start, end, ...args) =>
    Object.assign(type(...args), getLocRange(code, start, end));
  const createError = (...args) => codeFrameError(filename, code, ...args);
  const preserveWhitespace =
    htmlParserOpts && htmlParserOpts.preserveWhitespace;
  const file = { parse, parseExpression, ...createFile(filename, code) };
  const { program } = file;
  const { body } = program;
  const stack = [{ context: body }];
  let preservingWhitespace = preserveWhitespace;
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
          value = parseExpression(
            value,
            pos + (escape ? 2 /* ${ */ : 3) /* $!{ */
          );
          context.push(
            createNode(t.htmlPlaceholder, pos, endPos, value, escape)
          );
        }
      },

      onOpenTagName(event) {
        const { options = {} } =
          tagTranslators[toCamel(event.tagName)] || tagTranslators.base;
        if (options.html) event.setParseOptions(options.html);
        if (options.preserveWhitespace)
          preservingWhitespace = options.preserveWhitespace;
      },

      onOpenTag(event, parser) {
        let {
          tagName,
          argument,
          attributes,
          pos,
          endPos,
          tagNameEndPos,
          shorthandId,
          shorthandClassNames
        } = event;
        debugger;
        const { options = {} } =
          tagTranslators[toCamel(event.tagName)] || tagTranslators.base;
        let rawValue;
        let params;

        if (options.rawOpenTag) {
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
            const directive = directiveTranslators[toCamel(attr.name)];
            attrEndPos = attr.endPos;

            if (directive) {
              const { options = {} } = directive;
              if (options.html) event.setParseOptions(options.html);
              if (options.preserveWhitespace)
                preservingWhitespace = options.preserveWhitespace;
            }

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

        if (!startTag || (tagName && startTag.name !== tagName)) {
          throw createError(`Invalid closing tag ${tagName}.`, pos, endPos);
        }

        if (!pos) pos = parser.pos;
        if (!endPos) endPos = pos;

        const endTag = createNode(t.htmlEndTag, pos, endPos, tagName);

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
