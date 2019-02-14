import _hello from "./components/hello/index.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _hello_tag = _t(_hello);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "jk52ETtv",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _cols = [];
  const _items = [];

  for (const color of input.colors) {
    if (x) {
      _items.push({
        "style": {
          color
        },
        "renderBody": out => {
          out.t("foo");
        }
      });
    } else {
      _items.push({
        "style": {
          color
        },
        "renderBody": out => {
          out.t("bar");
        }
      });
    }
  }

  for (const col of input.table) {
    const _rows = [];

    for (const row of col) {
      _rows.push({
        "row": row,
        "renderBody": out => {
          out.t(row);
        }
      });
    }

    _cols.push({
      "x": y,
      "rows": _rows
    });
  }

  const _rows2 = [];

  _rows2.push({
    "row": -1,
    "renderBody": out => {
      out.t("Outside");
    }
  });

  _cols.push({
    "outside": true,
    "rows": _rows2
  });

  _hello_tag({
    "list": {
      "items": _items
    },
    "cols": _cols
  }, out, "12");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko"]
};
export default _marko_template;