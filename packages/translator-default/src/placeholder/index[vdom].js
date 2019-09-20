import write from "../util/vdom-out-write";

export default function(path) {
  const { node } = path;
  const { escape, value } = node;
  const method = escape ? "t" : "h";
  path.replaceWith(write(method, value));
}
