export default (hub, { value, pos } = {}) => {
  if (value) {
    return hub.parseExpression(`_(${value})`, pos).arguments;
  }
};
