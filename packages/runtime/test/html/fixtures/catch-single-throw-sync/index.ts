import { tryCatch, write } from "../../../../src/html/index";

const renderer = () => {
  write("a");
  tryCatch(
    () => {
      write("b");
      throw new Error("ERROR!");
      write("c");
    },
    err => {
      write(err.message);
    }
  );
  write("d");
};

export default renderer;
