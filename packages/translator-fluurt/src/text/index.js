import translateHTML from "./index[html]";
import translateDOM from "./index[vdom]";

export default function(path) {
  const {
    hub: { options }
  } = path;
  if (options.output === "html") {
    translateHTML(path);
  } else {
    translateDOM(path);
  }
}
