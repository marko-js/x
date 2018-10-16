import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _hello from "./components/hello/index.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/at-tags-dynamic/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
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

  _hello({
    "list": {
      "items": _items
    },
    "cols": _cols
  }, out, "0")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/at-tags-dynamic/template.marko",
  tags: ["./components/hello/index.marko"]
}
export default _marko_template;