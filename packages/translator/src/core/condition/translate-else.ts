import { types as t, NodePath } from "@marko/babel-types";
import {
  assertNoVar,
  assertNoArgs,
  assertNoParams,
  assertNoAttributes
} from "@marko/babel-utils";
import { flushBefore, flushInto } from "../../util/html-flush";
import toBlockStatementIfMultiple from "../../util/to-block-statement-if-multiple";
import { findPreviousIfStatement } from "./util";

export function enter(tag: NodePath<t.MarkoTag>) {
  assertNoVar(tag);
  assertNoArgs(tag);
  assertNoParams(tag);
  assertNoAttributes(tag);
  flushBefore(tag);
}

export function exit(tag: NodePath<t.MarkoTag>) {
  flushInto(tag);
  findPreviousIfStatement(tag).node.alternate = toBlockStatementIfMultiple(
    tag.node.body.body
  );
  tag.remove();
}