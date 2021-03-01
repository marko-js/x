import { types as t, NodePath } from "@marko/babel-types";
import {
  assertNoAttributeTags,
  assertNoAttributes,
  assertNoParams,
  assertNoVar
} from "@marko/babel-utils";
import { writeHTML } from "../util/html-write";
import { writeTemplate } from "../util/dom-writer";
import { isOutputHTML } from "../util/marko-config";

export function enter(tag: NodePath<t.MarkoTag>) {
  if (isOutputHTML(tag)) {
    writeHTML(tag)`<!--`;
  } else writeTemplate(tag, `<!--`);
}

export function exit(tag: NodePath<t.MarkoTag>) {
  assertNoVar(tag);
  assertNoParams(tag);
  assertNoAttributes(tag);
  assertNoAttributeTags(tag);

  if (isOutputHTML(tag)) {
    writeHTML(tag)`-->`;
  } else writeTemplate(tag, `-->`);

  tag.remove();
}