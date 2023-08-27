const handleAuth = (req, res, next) => {
  const { users } = req.app;
  const { name } = req.cookies;
  if (users.isUserLoggedIn(name)) {
    next();
  }

  res.status(401);
};

module.exports = { handleAuth };
