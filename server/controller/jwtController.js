const jwt = require('jsonwebtoken');

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    payLoad = {};
    const SECRET = process.env.ACCESS_TOKEN_JWT_SECRET;

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

module.exports = { signAccessToken };
