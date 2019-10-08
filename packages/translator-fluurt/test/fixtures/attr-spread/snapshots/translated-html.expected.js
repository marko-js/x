export default (input => {
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
});
import { attrs as _attrs, write as _write } from "fluurt/html";
import _test_tag from "./components/test.marko";