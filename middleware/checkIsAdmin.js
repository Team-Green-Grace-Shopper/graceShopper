const checkIsAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    console.log("User has administrator permissions");
    return next();
  } else {
    const error = new Error("You must be an administrator for this operation");
    return next(error);
  }
};

module.exports = checkIsAdmin;
