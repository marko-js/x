import { NodePath, MarkoCDATA } from '@marko/babel-types';
import translateHTML from "./html";
import translateDOM from "./dom";

export default function(path: NodePath<MarkoCDATA>) {
  const { output } = (path.hub as any).file.markoOpts as Record<string, unknown>;
  (output === "html" ? translateHTML : translateDOM)(path);
}
