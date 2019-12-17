import translateHTML from "./index[html]";
import translateDOM from "./index[dom]";

export function exit(path) {
  const {
    hub: { options }
  } = path;
  if (options.output === "html") {
    translateHTML(path);
  } else {
    translateDOM(path);
  }
}
