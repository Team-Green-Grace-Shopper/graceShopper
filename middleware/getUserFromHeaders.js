const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../db");

const JWT_SECRET = "some jwt secret";

const getUserFromHeaders = async (req, res, next) => {
  //get authorization header
  const authorization = req.header("Authorization");

  //if no authorization header
  if (!authorization) {
    return next();
  }

  // .split to separate "Bearer" and token string, [1] to access token string
  const token = authorization.split(" ")[1];

  //check if token exists
  if (!token) {
    return next();
  }

  //check if token is valid
  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const user = await getUserByEmail(email);
    if (user) {
      req.user = user;
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = getUserFromHeaders;
