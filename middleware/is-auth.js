const jwt = require('jsonwebtoken');

const handleError = () => {
  const error = new Error('Not authenticated.');
  error.statusCode = 401;
  throw error;
};

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    handleError();
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, 'iamlordvoldemort');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    handleError();
  }

  req.userId = decodedToken.userId;
  next();
};
