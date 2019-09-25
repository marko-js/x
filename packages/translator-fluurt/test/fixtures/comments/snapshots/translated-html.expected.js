export default (input => {
  out.w("<div>");
  out.w("<!--");
  out.w("abc");
  out.w("-->");
  out.w("<!--[if lt IE 9]><script src=\"...\"></script><![endif]-->");
  out.w("<!--");
  out.w("[if lt IE 9]><script src=\"...\"></script><![endif]");
  out.w("-->");
  out.w("</div>");
});