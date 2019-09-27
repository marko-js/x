export default (input => {
  out.w(`<input${_marko_attrs({ ...attrs
  })}>`);
  out.w(`<input${_marko_attrs({ ...input
  })}>`);
  out.w(`<input${_marko_attrs({ ...input.x
  })}>`);
  out.w(`<input${_marko_attrs({ ...input.x,
    ...input.y
  })}>`);
  out.w(`<input${_marko_attrs({ ...{
      a: 1
    }
  })}>`);
  out.w(`<input${_marko_attrs({ ...{
      a: 1,
      x: input.x
    }
  })}>`);
  out.w(" ");

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
import { as as _marko_attrs } from "marko/src/runtime/html/helpers";
import _test_tag from "./components/test.marko";