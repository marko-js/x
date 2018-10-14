import translateHTML from "./index[html]";

export default function(path) {
  const {
    hub: { options }
  } = path;
  if (options.output === "html") {
    translateHTML(path);
  }

  // Defers to html-comment renderer in vdom.
}
