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
  const file = createFile(filename, code);
  const { program } = file;
  const { body } = program;
  const stack = [{ context: body }];
  let preservingWhitespace = preserveWhitespace;
  let context = body;
  file.parse = parse;
  file.parseExpression = parseExpression;

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
        const endPos = pos + value.length;

        if (!preservingWhitespace) {
          value = value.trim();
          if (value === "") {
            return;
          }
        }

        context.push(createNode(t.htmlText, pos, endPos, value));
      },

      onPlaceholder({ escape, value, withinBody, pos, endPos }) {
        if (!withinBody) return;
        value = parseExpression(
          value,
          pos + (escape ? 2 /* ${ */ : 3) /* $!{ */
        );
        context.push(createNode(t.htmlPlaceholder, pos, endPos, value, escape));
      },

      onOpenTagName(event) {
        const { options = {} } =
          tagTranslators[toCamel(event.tagName)] || tagTranslators.base;
        if (options.html) event.setParseOptions(options.html);
        if (options.preserveWhitespace)
          preservingWhitespace = options.preserveWhitespace;
      },

      onOpenTag(event, parser) {
        let { tagName, argument, attributes, pos, endPos } = event;

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

          attributes = attributes.map(attr => {
            const directive = directiveTranslators[toCamel(attr.name)];

            if (directive) {
              const { options = {} } = directive;
              if (options.html) event.setParseOptions(options.html);
              if (options.preserveWhitespace)
                preservingWhitespace = options.preserveWhitespace;
            }

            if (attr.name.slice(0, 3) === "...") {
              const value = parseExpression(attr.name.slice(3), attr.pos + 3);
              // TODO: Inline merge object literals.
              return createNode(
                t.htmlSpreadAttribute,
                attr.pos,
                attr.endPos,
                value
              );
            }

            let value;

            if (attr.value) {
              const valueStart = attr.endPos - attr.value.length + 1; // Add 1 for the '='.
              value = parseExpression(attr.value, valueStart);
              value;
              code;
            } else {
              attr.endPos = attr.pos + attr.name.length;
              value = t.booleanLiteral(true);
            }

            return createNode(
              t.htmlAttribute,
              attr.pos,
              attr.endPos,
              attr.name,
              value
            );
          });
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
