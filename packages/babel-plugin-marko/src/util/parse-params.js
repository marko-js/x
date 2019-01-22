export default (hub, { value, pos } = {}) => {
  if (value) {
    return hub.parseExpression(`(${value})=>{}`, pos).params;
  }
};
