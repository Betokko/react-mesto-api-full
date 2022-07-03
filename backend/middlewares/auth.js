const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error-classes/UnauthorizedError');

const { JWT_SECRET = 'dev-secret' } = process.env;
const err = new UnauthorizedError('Необходима авторизация');

const auth = (req, res, next) => {
  // const { cookies } = req;

  // if (!cookies.jwt) {
  //   next(err);
  // }

  // const token = cookies.jwt;

  const token = req.headers.authorization.split(' ')[1];
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(err);
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
