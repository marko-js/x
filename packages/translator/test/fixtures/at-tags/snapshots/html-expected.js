_hello({
  foo: {
    renderBody() {
      _write("Foo!");
    }

  }
});

import { write as _write } from "@marko/runtime-fluurt/debug/html";
import _hello from "./components/hello/index.marko";