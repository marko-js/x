import MagicString from "magic-string";
const internalReg = /(?<=\b)___[a-z0-9$_]+(?=\b)/gi;

export default () => {
  const ids = new Map();
  return {
    name: "mangle-internal",
    transform(code, filename) {
      let m = internalReg.exec(code);

      if (!m) {
        return;
      }

      const s = new MagicString(code, { filename });

      do {
        const [v] = m;
        let id = ids.get(v);

        if (!id) {
          let index = ids.size;
          let mod = index % 34;
          id = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_"[mod]; // Avoids chars that could evaluate to a reserved word.
          index = (index - mod) / 34;

          while (index > 0) {
            mod = index % 64;
            id += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_"[
              mod
            ];
            index = (index - mod) / 64;
          }

          ids.set(v, id);
        }

        s.overwrite(m.index, m.index + v.length, id);
        m = internalReg.exec(code);
      } while (m);

      return {
        code: s.toString(),
        map: s.generateMap()
      };
    }
  };
};
