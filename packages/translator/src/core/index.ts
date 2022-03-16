import ImportTag from "./import";
import AttrsTag from "./attrs";
import IfTag from "./condition/if";
import ElseIfTag from "./condition/else-if";
import ElseTag from "./condition/else";
import ConstTag from "./const";
import EffectTag from "./effect";
import ForTag from "./for";
import GetTag from "./get";
import HTMLCommentTag from "./html-comment";
import LetTag from "./let";
import SetTag from "./set";
import StyleTag from "./style";
import TagTag from "./tag";
import YieldTag from "./yield";
import { taglibId } from "../util/is-core-tag";

export default {
  taglibId,
  "<import>": ImportTag,
  "<attrs>": AttrsTag,
  "<if>": IfTag,
  "<else-if>": ElseIfTag,
  "<else>": ElseTag,
  "<for>": ForTag,
  "<let>": LetTag,
  "<const>": ConstTag,
  "<effect>": EffectTag,
  "<html-comment>": HTMLCommentTag,
  "<tag>": TagTag,
  "<set>": SetTag,
  "<get>": GetTag,
  "<yield>": YieldTag,
  "<style>": StyleTag,
};
