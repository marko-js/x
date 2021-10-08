import { data, read, write, createRenderFn } from "../../../../src/dom/index";
import { after, over, open, close } from "../../utils/walks";

export const inputs = [
  {
    value: "Dynamic 1"
  },
  {
    value: "Dynamic 2"
  },
  {
    value: "Dynamic 3"
  }
];

const enum Index {
  TEXT = 0,
  INPUT_VALUE = 1
}

type scope = {
  [Index.TEXT]: Text;
  [Index.INPUT_VALUE]: typeof inputs[number]["value"];
};

// Static ${input.value}
export const template = "Static ";
export const walks = open(2) + after + over(1) + close;

export const execInputValue = () => {
  data(Index.TEXT, read(Index.INPUT_VALUE));
};

export const execDynamicInput = (input: typeof inputs[number]) => {
  if (write(Index.INPUT_VALUE, input.value)) {
    execInputValue();
  }
};

export default createRenderFn(template, walks, undefined, 0, execDynamicInput);
