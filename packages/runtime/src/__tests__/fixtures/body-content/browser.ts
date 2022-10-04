import type { Renderer } from "../../../common/types";
import {
  data,
  createRenderFn,
  on,
  source,
  queueHydrate,
  setSource,
  queueSource,
  bind,
  Scope,
  destructureSources,
  dynamicClosure,
  createRenderer,
  conditional,
  dynamicSubscribers,
} from "../../../dom/index";
import { bindRenderer } from "../../../dom/scope";
import { get, next, beginChild, endChild } from "../../utils/walks";

////////////////////////////////////////////////////
// FancyButton
////////////////////////////////////////////////////
// <attrs/{ renderBody, onclick }/>
// <button onclick=onclick><${renderBody}/></button>

const enum FancyButton$Index {
  BUTTON = 0,
  COMMENT = 1,
  RENDER_BODY = 6,
  ON_CLICK = 7,
}

type FancyButton$ComponentScope = Scope<{
  [FancyButton$Index.BUTTON]: HTMLButtonElement;
  [FancyButton$Index.COMMENT]: Comment;
  [FancyButton$Index.RENDER_BODY]: Renderer;
  [FancyButton$Index.ON_CLICK]: (e: Event) => void;
}>;

const FancyButton$template = `<button><!></button>`;
const FancyButton$walks = get + next(1) + get + next(1);

const FancyButton$renderBodyDynamicTag = conditional(
  FancyButton$Index.COMMENT,
  1,
  (scope: FancyButton$ComponentScope) => {
    return scope[FancyButton$Index.RENDER_BODY] as any;
  }
);

const FancyButton$renderBody = source(FancyButton$Index.RENDER_BODY, [
  FancyButton$renderBodyDynamicTag,
]);

const FancyButton$onclick = source(
  FancyButton$Index.ON_CLICK,
  [],
  (_scope: FancyButton$ComponentScope) => {
    queueHydrate(_scope, FancyButton$onclick_hydrate);
  }
);

export const FancyButton$onclick_hydrate = (
  scope: FancyButton$ComponentScope
) => {
  const onclick = scope[FancyButton$Index.ON_CLICK];

  on(scope[FancyButton$Index.BUTTON], "click", onclick);
};

export const FancyButton$attrs = destructureSources(
  [FancyButton$renderBody, FancyButton$onclick],
  (scope: ComponentScope, { renderBody, onclick }: any) => {
    setSource(scope, FancyButton$renderBody, renderBody);
    setSource(scope, FancyButton$onclick, onclick);
  }
);

export const FancyButton = createRenderFn(
  FancyButton$template,
  FancyButton$walks,
  undefined,
  FancyButton$attrs
);

/////////////////////////
// Main
/////////////////////////
// <let/clickCount = 0/>
// <FancyButton onclick() { clickCount++ }>${clickCount}</FancyButton>

const enum Index {
  FANCYBUTTON_SCOPE = 0,
  CLICK_COUNT = 1,
  LISTENERS = 2,
}

type ComponentScope = Scope<{
  [Index.CLICK_COUNT]: number;
  [Index.FANCYBUTTON_SCOPE]: FancyButton$ComponentScope;
}>;

export const template = `${FancyButton$template}`;
export const walks = `${beginChild(
  Index.FANCYBUTTON_SCOPE
)}${FancyButton$walks}${endChild}`;

export const setup = (scope: ComponentScope) => {
  setSource(scope, _clickCount, 0);
  setSource(scope[Index.FANCYBUTTON_SCOPE], FancyButton$attrs, {
    onclick: bind(scope, clickHandler),
    renderBody: bindRenderer(scope, renderBody),
  });
};

const _clickCount = source(Index.CLICK_COUNT, [
  dynamicSubscribers(Index.CLICK_COUNT),
]);

const clickHandler = (scope: ComponentScope) => {
  queueSource(scope, _clickCount, scope[Index.CLICK_COUNT] + 1);
};

const clickCount$renderBody = dynamicClosure(
  1,
  Index.CLICK_COUNT,
  [],
  (scope: RenderBody$Scope, value: ComponentScope[Index.CLICK_COUNT]) => {
    data(scope[RenderBody$Index.TEXT], value);
  }
);

const enum RenderBody$Index {
  TEXT = 0,
}

type RenderBody$Scope = Scope<{
  [RenderBody$Index.TEXT]: Text;
}>;

const renderBody = createRenderer(" ", get + next(1), undefined, [
  clickCount$renderBody,
]);

export default createRenderFn(template, walks, setup);