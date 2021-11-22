const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/home";


router.get("/login/failed", (req, res) => {

  res.status(401).json({
    status: 0,
    msg: "failure",
  });
});

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(CLIENT_URL);
// });

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router;
