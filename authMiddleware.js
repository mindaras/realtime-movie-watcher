const auth = (req, res, next) => {
  const auth = {
    login: process.env.BASIC_AUTH_LOGIN,
    password: process.env.BASIC_AUTH_PASSWORD,
  };

  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  if (login === auth.login && password === auth.password) {
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required.");
};

module.exports = { auth };
