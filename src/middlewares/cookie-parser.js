const parseCookieParams = (cookieParams) => {
  return Object.fromEntries(
    cookieParams.map((cookieParam) => {
      return cookieParam.split("=");
    })
  );
};

const parseCookies = (req, _, next) => {
  const rawCookies = req.headers.cookie || "";
  const cookieParams = rawCookies.split("; ");

  const cookies = parseCookieParams(cookieParams);
  req.cookies = cookies;

  next();
};

module.exports = { parseCookies };
