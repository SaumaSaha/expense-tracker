const logRequest = (req, _, next) => {
  console.log(req.method, req.url);

  next();
};

module.exports = { logRequest };
