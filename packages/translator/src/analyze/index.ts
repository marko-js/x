import { Visitor } from "@marko/babel-types";
import analyzeTagNameType, { TagNameTypes } from "./tag-name-type";
import analyzeNestedAttributeTags from "./nested-attribute-tags";
import analyzeEventHandlers from "./event-handlers";
import {
  analyzeStatefulTagParts,
  analyzeStatefulPlaceholder
} from "./stateful-parts";

declare module "@marko/babel-types" {
  // This is extended by individual helpers.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface MarkoTagExtra {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface MarkoAttributeExtra {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface MarkoPlaceholderExtra {}

  export interface MarkoTag {
    extra: MarkoTagExtra & Record<string, unknown>;
  }

  export interface MarkoAttribute {
    extra: MarkoAttributeExtra & Record<string, unknown>;
  }

  export interface MarkoPlaceholder {
    extra: MarkoPlaceholderExtra & Record<string, unknown>;
  }
}

export default {
  MarkoTag(tag) {
    const extra = (tag.node.extra ??= {} as typeof tag.node.extra);
    analyzeTagNameType(tag);

    if (extra.tagNameType === TagNameTypes.NativeTag) {
      analyzeEventHandlers(tag);
    } else {
      analyzeNestedAttributeTags(tag);
    }

    analyzeStatefulTagParts(tag);
  },
  MarkoPlaceholder(placeholder) {
    placeholder.node.extra ??= {} as typeof placeholder.node.extra;
    analyzeStatefulPlaceholder(placeholder);
  }
} as Visitor;
