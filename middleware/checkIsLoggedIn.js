const checkIsLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log("User is logged in");
    return next();
  } else {
    const error = new Error("You must be logged in for this operation");
    return next(error);
  }
};

module.exports = checkIsLoggedIn;
