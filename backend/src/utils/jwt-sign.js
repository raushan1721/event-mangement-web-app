var jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (user,msg) {
  jwt.sign(
    {
      user: user._id,
    },
    config.get("jwtSecret"),
    { expiresIn: "200h" },
    (err, token) => {

      if (err) throw err;
      if (token) {

        return res.cookie("access_token", token, {
          maxAge: 24 * 60 * 60 * 100,
          httpOnly:true
        })
          .status(200)
        .json({
          status: 1,
          msg: msg,
          data: { user: user._id, "auth-token": token },
        });    
      }
    }
  );
};
