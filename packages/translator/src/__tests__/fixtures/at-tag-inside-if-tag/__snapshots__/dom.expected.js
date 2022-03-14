let _thing;

import { write as _write, setConditionalRenderer as _setConditionalRenderer, createRenderer as _createRenderer, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
import { apply as _customTag, template as _customTag_template, walks as _customTag_walks } from "./components/custom-tag/index.marko";

function _apply_x(_scope, x = _scope._[0]) {
  _setConditionalRenderer(_scope, 0, x ? _if : null);
}

function _apply(_scope) {
  _customTag();
}

const _temp2 = _createRenderer("<!>", "%+", null),
      _if = _createRenderer("", "", null);

export const template = `${_customTag_template}`;
export const walks = `${_customTag_walks}`;
export const apply = _apply;
export default _createRenderFn(template, walks, apply);