const handleAuth = (req, res, next) => {
  const { users } = req.app;
  const { name } = req.cookies;
  if (users.isUsernameExists(name)) {
    next();
    return;
  }

  res.redirect(303, "/sign-in");
};

module.exports = { handleAuth };
