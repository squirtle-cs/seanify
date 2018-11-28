/**
 * @module cookieController.js
 * @description Middleware for Cookie Handling
 */

/**
 * Middleware to set Cookie based on what is available in res.locals
 * @param {Request} req Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const setCookie = (req, res, next) => {
  const tokens = Object.keys(res.locals.cookies);
  tokens.forEach((token) => {
    res.cookie(token, res.locals.cookies[token], { maxAge: 3600000, httpOnly: true });
  });
  return next();
};

module.exports = {
  setCookie,
};
