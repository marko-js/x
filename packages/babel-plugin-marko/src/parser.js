import { createParser } from "htmljs-parser";
import parseAttributes from "./util/parse-attributes";
import parseArguments from "./util/parse-arguments";
import parseParams from "./util/parse-params";
import parseIDShorthand from "./util/parse-id-shorthand";
import parseClassnameShorthand from "./util/parse-classname-shorthand";
import { getLocRange } from "./util/get-loc";
import * as t from "./definitions";
const EMPTY_OBJECT = {};
const htmlTrimStart = t => t.replace(/^[\n\r]\s*/, "");
const htmlTrimEnd = t => t.replace(/[\n\r]\s*$/, "");
const htmlTrim = t => htmlTrimStart(htmlTrimEnd(t));
const isNestedTag = node =>
  t.isStringLiteral(node.name) && node.name.value[0] === "@";

export function parse(hub) {
  const { filename, htmlParseOptions = {} } = hub;
  const { preserveWhitespace } = htmlParseOptions;
  const code = hub.getCode();
  let { body } = hub.file.program;
  const stack = [{ body }];
  let preservingWhitespaceUntil = preserveWhitespace;
  let wasSelfClosing = false;
  let wasConcise = false;
  let onNext;

  createParser(
    {
      onDocumentType({ value, pos, endPos }) {
        const node = hub.createNode("markoDocumentType", pos, endPos, value);
        body.push(node);
        /* istanbul ignore next */
        onNext = onNext && onNext(node);
      },

      onDeclaration({ value, pos, endPos }) {
        const node = hub.createNode("markoDeclaration", pos, endPos, value);
        body.push(node);
        /* istanbul ignore next */
        onNext = onNext && onNext(node);
      },

      onComment({ value, pos, endPos }) {
        const node = hub.createNode("markoComment", pos, endPos, value);
        body.push(node);
        onNext = onNext && onNext(node);
      },

      onCDATA({ value, pos, endPos }) {
        const node = hub.createNode("markoCDATA", pos, endPos, value);
        body.push(node);
        onNext = onNext && onNext(node);
      },

      onText({ value }, { pos }) {
        const shouldTrim = !preservingWhitespaceUntil;

        if (shouldTrim) {
          if (htmlTrim(value) === "") {
            return;
          }

          // Find previous non-scriptlet/@tag.
          let prev;
          let prevIndex = body.length;
          while (prevIndex > 0) {
            prev = body[--prevIndex];

            if (t.isMarkoScriptlet(prev) || isNestedTag(prev)) {
              prev = undefined;
            } else {
              break;
            }
          }

          if (!prev) {
            const originalValue = value;
            value = htmlTrimStart(value);
            pos += originalValue.indexOf(value);
          }
        }

        const endPos = pos + value.length;
        const node = hub.createNode("markoText", pos, endPos, value);
        const prevBody = body;
        body.push(node);
        onNext && onNext(node);
        onNext =
          shouldTrim &&
          (next => {
            if (!next || prevBody.indexOf(next) === -1) {
              node.value = htmlTrimEnd(node.value);
            }

            node.value = node.value.replace(/\s+/g, " ");
          });
      },

      onPlaceholder({ escape, value, withinBody, pos, endPos }) {
        if (withinBody) {
          const node = hub.createNode(
            "markoPlaceholder",
            pos,
            endPos,
            hub.parseExpression(
              value,
              pos + (escape ? 2 /* ${ */ : 3) /* $!{ */
            ),
            escape
          );

          body.push(node);
          onNext = onNext && onNext(node);
        }
      },

      onScriptlet({ value, line, block, pos, endPos }) {
        if (!line && !block) {
          throw hub.buildError(
            { start: pos, end: endPos },
            "<% scriptlets %> are no longer supported."
          );
        }

        // Scriptlets are ignored as content and don't call `onNext`.
        body.push(
          hub.createNode(
            "markoScriptlet",
            pos,
            endPos,
            hub.parse(value, pos).body
          )
        );
      },

      onOpenTagName(event) {
        const { tagName, pos, endPos } = event;
        const [, tagNameExpression] =
          /^\$\{([\s\S]+)\}/.exec(tagName) || EMPTY_OBJECT;
        const tagDef = !tagNameExpression && hub.lookup.getTag(tagName);
        const tagNameStartPos = pos + (event.concise ? 0 : 1); // Account for leading `<`.
        const node = hub.createNode(
          "markoTag",
          pos,
          endPos,
          tagNameExpression
            ? hub.parseExpression(
                tagNameExpression,
                tagNameStartPos + 2 /* ${ */
              )
            : hub.createNode(
                "stringLiteral",
                tagNameStartPos,
                tagNameStartPos + tagName.length,
                tagName
              )
        );

        if (tagDef) {
          node.tagDef = tagDef;

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

        stack.push(node);
        body.push(node);
        body = node.body;

        // @tags are not treated as content and do not call next.
        if (!isNestedTag(node)) {
          onNext = onNext && onNext(node);
        }
      },

      onOpenTag(event, parser) {
        const { pos, endPos, tagNameEndPos } = event;
        const node = stack[stack.length - 1];
        const { tagDef } = node;
        const parseOptions = (tagDef && tagDef.parseOptions) || EMPTY_OBJECT;
        wasSelfClosing = event.selfClosed;
        wasConcise = event.concise;

        if (parseOptions.rawOpenTag) {
          node.rawValue = parser
            .substring(pos, endPos)
            .replace(/^<|\/>$|>$/g, "");
        } else {
          node.params = parseParams(hub, event.params);
          node.arguments = parseArguments(hub, event.argument);
          node.attributes = parseAttributes(
            hub,
            event.attributes,
            tagNameEndPos
          );
          node.attributes = parseIDShorthand(
            hub,
            event.shorthandId,
            node.attributes
          );
          node.attributes = parseClassnameShorthand(
            hub,
            event.shorthandClassNames,
            node.attributes
          );
        }

        if (!preservingWhitespaceUntil && parseOptions.preserveWhitespace) {
          preservingWhitespaceUntil = node;
        }
      },

      onCloseTag(event, parser) {
        let { tagName, pos, endPos } = event;
        const node = stack.pop();
        const { tagDef } = node;
        body = stack[stack.length - 1].body;

        if (preservingWhitespaceUntil === node) {
          preservingWhitespaceUntil = undefined;
        }

        if (!pos) {
          pos = parser.pos;
        }

        if (!endPos) {
          endPos = pos;

          if (wasSelfClosing && !wasConcise) {
            endPos += 2; // account for "/>"
          }
        }

        Object.assign(node, getLocRange(code, node.start, endPos));

        if (tagName && !wasSelfClosing) {
          if (t.isStringLiteral(node.name)) {
            if (node.name.value !== tagName) {
              throw hub.buildError(
                { start: pos, end: endPos },
                `Invalid closing tag ${tagName}.`
              );
            }
          } else if (!wasSelfClosing && code.slice(pos, endPos) !== "</>") {
            throw hub.buildError(
              { start: pos, end: endPos },
              `Invalid ending for dynamic tag ${tagName}.`
            );
          }
        }

        if (tagDef && tagDef.nodeFactoryPath) {
          const module = require(tagDef.nodeFactoryPath);
          const { default: fn = module } = module;
          body.splice(
            body.length - 1,
            1,
            ...[].concat(fn(hub.createNodePath(node)))
          );
        }
      },

      onfinish() {
        onNext = onNext && onNext();
      },

      onError({ message, pos, endPos }) {
        if (message.includes("EOF")) endPos = pos;
        throw hub.buildError({ start: pos, end: endPos }, message);
      }
    },
    {
      isOpenTagOnly(name) {
        const { parseOptions = EMPTY_OBJECT } =
          hub.lookup.getTag(name) || EMPTY_OBJECT;
        return parseOptions.openTagOnly;
      },
      ...htmlParseOptions
    }
  ).parse(code, filename);

  return hub.file;
}
