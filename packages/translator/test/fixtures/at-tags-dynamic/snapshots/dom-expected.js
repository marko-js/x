const _col = [];
const _item = [];

for (const color of input.colors) {
  if (x) _item.push({
    style: {
      color
    }
  });else _item.push({
    style: {
      color
    }
  });
}

for (const col of input.table) {
  const _row = [];

  for (const row of col) {
    _row.push({
      row: row,

      renderBody() {
        ${row}
      }

    });
  }

  _col.push({
    x: y,
    row: _row
  });
}

_col.push({
  outside: true,
  row: {
    row: -1
  }
});

_hello({
  col: _col,
  list: {
    item: _item
  }
});

import _hello from "./components/hello/index.marko";