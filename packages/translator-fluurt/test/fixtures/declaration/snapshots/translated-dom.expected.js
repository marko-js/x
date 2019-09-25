export default (input => {
  _beginEl("contact-info");

  _beginEl("name");

  _text("Hello World");

  _endEl();

  _endEl();
});
import { text as _text, beginEl as _beginEl, endEl as _endEl } from "fluurt";