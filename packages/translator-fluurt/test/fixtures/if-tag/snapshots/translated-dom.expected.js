export default (input => {
  const _ifBranch = () => {
    _text("Hello");
  };

  _conditional(a + b && _ifBranch);

  const _if2Branch = () => {
    _text("World");
  };

  _conditional((a, b) && _if2Branch);

  _beginEl("div");

  {
    const _if3Branch = () => {
      _text("A");
    };

    const _if3Branch2 = () => {
      _text("B");
    };

    const _if3Branch3 = () => {
      _text("C");
    };

    _conditional(x ? _if3Branch : y ? _if3Branch2 : _if3Branch3);
  }

  _endEl();

  const _if4Branch = () => {
    _text("Hi Again");
  };

  _conditional(_compute(() => _get(input.x) && _if4Branch));
});
import { text as _text, conditional as _conditional, beginEl as _beginEl, endEl as _endEl, get as _get, compute as _compute } from "fluurt";