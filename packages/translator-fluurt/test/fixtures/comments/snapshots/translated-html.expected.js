export default (input => {
  _write("<div><!--abc--><!--[if lt IE 9]><script src=\"...\"></script><![endif]--><!--[if lt IE 9]><script src=\"...\"></script><![endif]--></div>");
});
import { write as _write } from "fluurt/html";