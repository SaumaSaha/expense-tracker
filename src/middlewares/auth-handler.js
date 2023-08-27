const handleAuth = (req, res, next) => {
  const { users } = req.app;
  const { name } = req.cookies;
  if (users.isUsernameExists(name)) {
    next();
    return;
  }

  res.status(403).send();
};

module.exports = { handleAuth };
