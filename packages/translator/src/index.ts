import { Visitor } from "@marko/babel-types";
import { isOutputHTML } from "./util/marko-config";
import { flushHTML } from "./util/html-flush";
import MarkoDocumentType from "./document-type";
import MarkoDeclaration from "./declaration";
import MarkoCDATA from "./cdata";
import MarkoText from "./text";
import * as MarkoTag from "./tag";
import MarkoPlaceholder from "./placeholder";
import MarkoComment from "./comment";

export const taglibs = [];

export const visitor: Visitor = {
  Program: {
    enter(path) {
      path.state = {};
    },
    exit(path) {
      if (isOutputHTML(path)) {
        flushHTML(path, it => path.pushContainer("body", it));
      }
    }
  },
  MarkoDocumentType,
  MarkoDeclaration,
  MarkoCDATA,
  MarkoText,
  MarkoTag,
  MarkoPlaceholder,
  MarkoComment
};
