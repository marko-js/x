// TODO
import type { Visitor } from "@marko/babel-types";
import MarkoCDATA from "./cdata";

export const taglibs = [];

export const visitor: Visitor = {
  MarkoCDATA
};
