export default (input => {
  const _ifBranch = () => {
    _write("Hello");
  };

  _conditional(a + b && _ifBranch);

  const _if2Branch = () => {
    _write("World");
  };

  _conditional((a, b) && _if2Branch);

  _write("<div>");

  {
    const _if3Branch = () => {
      _write("A");
    };

    const _if3Branch2 = () => {
      _write("B");
    };

    const _if3Branch3 = () => {
      _write("C");
    };

    _conditional(x ? _if3Branch : y ? _if3Branch2 : _if3Branch3);
  }

  _write("</div>");

  const _if4Branch = () => {
    _write("Hi Again");
  };

  _conditional(input.x && _if4Branch);
});
import { write as _write } from "fluurt/html";
import { conditional as _conditional } from "fluurt";