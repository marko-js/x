import * as optimizeHTML from "./index[html]";

export default function(path) {
  const {
    hub: { options }
  } = path;
  if (options.output === "html") {
    path.parentPath.traverse(optimizeHTML.visitor);
  }
}
