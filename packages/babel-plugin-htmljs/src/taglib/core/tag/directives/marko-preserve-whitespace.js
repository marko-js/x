/**
 * Enables whitespace preservation for this element.
 */
export default translate;
translate.options = {
  preserveWhitespace: true
};

function translate(path, attr) {
  attr.remove();
}
