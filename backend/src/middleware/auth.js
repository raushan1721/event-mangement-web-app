const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // const token = req.header("Authorization").split(" ")[1];
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ errors: [{ msg: "Token is not valid!" }] });
  }
};
