const _marko_template = _t(__filename);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import _hello from "./components/hello/index.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _hello_tag = _marko_load_tag(_hello);

import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "Cat4Aq2g",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  const _cols = [];
  const _items = [];

  for (const color of input.colors) {
    if (x) {
      _items.push({
        "*": {
          "style": {
            color
          }
        },
        "renderBody": out => {
          out.w("foo");
        }
      });
    } else {
      _items.push({
        "*": {
          "style": {
            color
          }
        },
        "renderBody": out => {
          out.w("bar");
        }
      });
    }
  }

  let i = 10;

  while (i--) {
    _items.push({
      "renderBody": out => {
        out.w(_marko_escapeXml(i));
      }
    });
  }

  for (const col of input.table) {
    const _rows = [];

    for (const row of col) {
      _rows.push({
        "*": {
          "row": row
        },
        "renderBody": out => {
          out.w(_marko_escapeXml(row));
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
    "*": {
      "row": -1
    },
    "renderBody": out => {
      out.w("Outside");
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
  }, out, _component, "0");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko"]
};