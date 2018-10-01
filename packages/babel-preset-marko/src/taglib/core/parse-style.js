import { basename } from "path";

export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue } = startTag;
  const base = basename(hub.filename);
  let type;
  const code = rawValue
    .replace(/^style(?:\.([^\s]+))?\s*/, (_, _type) => {
      type = _type || "css";
      return "";
    })
    .trim();
  hub.meta.deps.push({
    type,
    code,
    path: `./${base}`,
    virtualPath: `./${base}.${type}`
  });
  return;
}
