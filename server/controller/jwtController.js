const jwt = require('jsonwebtoken');

const SECRET = process.env.ACCESS_TOKEN_JWT_SECRET;
const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    payLoad = {};

    const options = {
      expiresIn: '1h',
      issuer: 'EventHassle',
      audience: userId,
    };
    jwt.sign(payLoad, SECRET, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) return next('Not Authorized');
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return next('Not authorized');
    req.payload = payload;
    next();
  });
};

module.exports = { signAccessToken, verifyAccessToken };
