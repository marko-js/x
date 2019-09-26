export default (input => {
  _beginEl("html");

  _beginEl("head");

  _beginEl("title");

  _text("Title of the document");

  _endEl();

  _endEl();

  _beginEl("body");

  _text("The content of the document......");

  _endEl();

  _endEl();
});
import { text as _text, beginEl as _beginEl, endEl as _endEl } from "fluurt";