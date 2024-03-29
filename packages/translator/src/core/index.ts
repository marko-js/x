import { taglibId } from "../util/is-core-tag";
import ImportTag from "./import";
import ExportTag from "./export";
import AttrsTag from "./attrs";
import IfTag from "./condition/if";
import ElseIfTag from "./condition/else-if";
import ElseTag from "./condition/else";
import ConstTag from "./const";
import EffectTag from "./effect";
import LifecycleTag from "./lifecycle";
import IdTag from "./id";
import ForTag from "./for";
import GetTag from "./get";
import HTMLCommentTag from "./html-comment";
import LetTag from "./let";
import PutTag from "./put";
import StyleTag from "./style";
import TagTag from "./tag";
import ReturnTag from "./return";
import StaticTag from "./static";
import NoopTag from "./noop";
import FlushHereAndAfter from "./__flush_here_and_after__";

export default {
  taglibId,
  "<import>": ImportTag,
  "<export>": ExportTag,
  "<attrs>": AttrsTag,
  "<if>": IfTag,
  "<else-if>": ElseIfTag,
  "<else>": ElseTag,
  "<for>": ForTag,
  "<let>": LetTag,
  "<const>": ConstTag,
  "<effect>": EffectTag,
  "<lifecycle>": LifecycleTag,
  "<id>": IdTag,
  "<html-comment>": HTMLCommentTag,
  "<tag>": TagTag,
  "<put>": PutTag,
  "<get>": GetTag,
  "<return>": ReturnTag,
  "<style>": StyleTag,
  "<await-reorderer>": NoopTag,
  "<init-widgets>": NoopTag,
  "<init-components>": NoopTag,
  "<static>": StaticTag,
  "<__flush_here_and_after__>": FlushHereAndAfter,
};
