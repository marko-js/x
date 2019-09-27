export default (input => {
  _beginEl("input");

  _dynamicAttrs(attrs);

  _endEl();

  _beginEl("input");

  _dynamicAttrs(input);

  _endEl();

  _beginEl("input");

  _dynamicAttrs(input.x);

  _endEl();

  _beginEl("input");

  _dynamicAttrs(_compute(() => ({ ..._get(input.x),
    ..._get(input.y)
  })));

  _endEl();

  _beginEl("input");

  _dynamicAttrs({
    a: 1
  });

  _endEl();

  _beginEl("input");

  _dynamicAttrs({
    a: 1,
    x: input.x
  });

  _endEl();

  _text(" ");

  _test_tag(attrs);

  _test_tag(input);

  _test_tag(input.x);

  _test_tag(_compute(() => ({ ..._get(input.x),
    ..._get(input.y)
  })));

  _test_tag({
    a: 1
  });

  _test_tag({
    a: 1,
    x: input.x
  });
});
import { beginEl as _beginEl, dynamicAttrs as _dynamicAttrs, endEl as _endEl, get as _get, compute as _compute, text as _text } from "fluurt";
import _test_tag from "./components/test.marko";