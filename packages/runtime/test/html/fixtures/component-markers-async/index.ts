import { write, fork } from "../../../../src/html/index";
import { resolveAfter } from "../../../utils/resolve";
import { serverRegister } from "../../../../src/common/server-registry";

const renderer = () => {
  firstComponent({});
  secondComponent({});
};

const firstComponent = serverRegister("first", () => {
  write("x");
  write("y");
  write("z");
});

const secondComponent = serverRegister("second", () => {
  write("a");
  fork(resolveAfter("b", 1), write);
  fork(resolveAfter("c", 2), write);
});

export default renderer;
