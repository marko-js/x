import child from "./components/child/index.marko";
const data1 = child();

const _tagName = input.show && child;

let data2 = void 0;
if (_tagName) data2 = _tagName();

const data3 = _dynamicTag(input.dynamic, null);

const _tagName2 = input.show && "div";

const el1 = void 0;
if (_tagName2) _write(`<${_tagName2}></${_tagName2}>`);
import { dynamicTag as _dynamicTag, write as _write } from "@marko/runtime-fluurt/src/html";