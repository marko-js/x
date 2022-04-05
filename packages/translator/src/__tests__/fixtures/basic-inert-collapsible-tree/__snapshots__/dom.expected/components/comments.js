import { queue as _queue, attr as _attr, data as _data, on as _on, setConditionalRenderer as _setConditionalRenderer, setLoopOf as _setLoopOf, queueInBranch as _queueInBranch, register as _register, bind as _bind, queueHydrate as _queueHydrate, write as _write, queueForEach as _queueForEach, createRenderer as _createRenderer, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
import { apply as _comments, applyAttrs as _comments_attrs, template as _comments_template, walks as _comments_walks } from "./comments.marko";

function _applyWith_comment_id(_scope, comment = _scope._[8], id = _scope._[10]) {
  _comments_attrs(_scope[0], {
    comments: comment.comments,
    path: id
  });
}

function _apply_id2(_scope, id = _scope._[10]) {
  _queue(_scope, _applyWith_comment_id, 2);
}

function _apply_comment2(_scope, comment = _scope._[8]) {
  _queue(_scope, _applyWith_comment_id, 2);
}

function _apply2(_scope) {
  _comments(_scope[0]);

  _queue(_scope, _apply_id2, 1);

  _queue(_scope, _apply_comment2, 0);
}

const _onclick = function (_scope) {
  const open = _scope[11];

  _queue(_scope, _apply_open, 4, !open);
};

function _hydrate_open(_scope, open = _scope[11]) {
  _on(_scope, 2, "click", _bind(_scope, _onclick));
}

_register("packages/translator/src/__tests__/fixtures/basic-inert-collapsible-tree/components/comments.marko_1_0", _hydrate_open);

function _applyWith_path_i(_scope, path = _scope._[5], i = _scope[9]) {
  _apply_id(`${path}-${i}`);
}

function _apply_open(_scope, open) {
  if (_write(_scope, 11, open)) {
    _attr(_scope, 0, "hidden", !open);

    _data(_scope, 3, open ? "[-]" : "[+]");

    _queueHydrate(_scope, _hydrate_open);
  }
}

function _apply_id(_scope, id) {
  if (_write(_scope, 10, id)) {
    _attr(_scope, 0, "id", id);

    _queueInBranch(_scope, 4, _if, _apply_id2, 1, 3);
  }
}

function _apply_i(_scope, i) {
  if (_write(_scope, 9, i)) _queue(_scope, _applyWith_path_i, 5);
}

function _apply_comment(_scope, comment) {
  if (_write(_scope, 8, comment)) {
    _data(_scope, 1, comment.text);

    _setConditionalRenderer(_scope, 4, comment.comments ? _if : null);

    _queueInBranch(_scope, 4, _if, _apply_comment2, 0, 4);
  }
}

function _apply_path(_scope, path = _scope._[5]) {
  _queue(_scope, _applyWith_path_i, 5);
}

function _apply_path(_scope, path = _scope._[5]) {
  _queue(_scope, _applyWith_path_i, 5);
}

function _apply(_scope) {
  _apply_open(_scope, true);

  _queue(_scope, _apply_path, 0);

  _queue(_scope, _apply_path, 0);
}

function _apply_path2(_scope, path) {
  if (_write(_scope, 5, path)) {
    _queueForEach(_scope, 0, _apply_path, 0, 6);

    _queueForEach(_scope, 0, _apply_path, 0, 7);
  }
}

function _apply_comments(_scope, comments) {
  if (_write(_scope, 4, comments)) _setLoopOf(_scope, 0, comments, _for, null, _apply_comment);
}

const _for = _createRenderer("<li><span> </span><button> </button><!></li>",
/* get, next(2), get, out(1), get, next(1), get, out(1), replace, skip(3) */
" E l D l%+", _apply),
      _if = _createRenderer(`${_comments_template}`,
/* beginChild(0), _comments_walks, endChild */
`/${_comments_walks}&`, _apply2);

export const applyAttrs = function (_scope, {
  comments,
  path = "c"
}) {
  _apply_comments(_scope, comments);

  _apply_path2(_scope, path);
};
export { _apply_comments, _apply_path2 as _apply_path };
export const template = "<ul></ul>";
export const walks =
/* get, skip(3), over(1) */
" +b";
export const apply = function () {};
export default _createRenderFn(template, walks, apply, applyAttrs);