export default function _renderer(input) {
  _write(`<input${_attrs({ ...attrs
  })}><input${_attrs({ ...input
  })}><input${_attrs({ ...input.x
  })}><input${_attrs({ ...input.x,
    ...input.y
  })}><input${_attrs({ ...{
      a: 1
    }
  })}><input${_attrs({ ...{
      a: 1,
      x: input.x
    }
  })}> `);

  _test_tag(attrs);

  _test_tag(input);

  _test_tag(input.x);

  _test_tag({ ...input.x,
    ...input.y
  });

  _test_tag({
    a: 1
  });

  _test_tag({
    a: 1,
    x: input.x
  });
}
import { createRenderer as _createRenderer, register as _register, attrs as _attrs, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("Z9KK3eIs", _renderer));

export { _render as render };
import _test_tag from "./components/test.marko";