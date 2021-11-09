// create generic try catch block for all the routes:

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
