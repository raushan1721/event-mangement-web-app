const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json({ extended: false }));
const passportSetup = require("../backend/src/utils/passportsetup");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected!!"))
  .catch((err) => console.log(err));

app.use("/user", require("./src/router/user"));
app.use("/auth", require("./src/router/auth"));
app.use("/socialauth", require("./src/router/socialAuth"));
app.use("/profile", require("./src/router/profile"));
app.use("/guest", require("./src/router/guest"));
app.use("/event", require("./src/router/event"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log("server started on " + PORT));
