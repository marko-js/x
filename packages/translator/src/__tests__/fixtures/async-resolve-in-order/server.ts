import { fork, write } from "@marko/runtime-fluurt/src/html";
import { resolveAfter } from "../../utils/resolve";

const renderer = () => {
  write("a");
  fork(resolveAfter("b", 1), write);
  write("c");
  fork(resolveAfter("d", 2), write);
  write("e");
};

export default renderer;
