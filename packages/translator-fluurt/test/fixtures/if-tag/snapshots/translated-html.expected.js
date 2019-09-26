export default (input => {
  const _ifBranch = () => {
    out.w("Hello");
  };

  _conditional(a + b && _ifBranch);

  const _if2Branch = () => {
    out.w("World");
  };

  _conditional((a, b) && _if2Branch);

  out.w("<div>");
  {
    const _if3Branch = () => {
      out.w("A");
    };

    const _if3Branch2 = () => {
      out.w("B");
    };

    const _if3Branch3 = () => {
      out.w("C");
    };

    _conditional(x ? _if3Branch : y ? _if3Branch2 : _if3Branch3);
  }
  out.w("</div>");

  const _if4Branch = () => {
    out.w("Hi Again");
  };

  _conditional(input.x && _if4Branch);
});
import { conditional as _conditional } from "fluurt";