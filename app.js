const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// Flash message library
const flash = require("connect-flash");

// Session library
const session = require("express-session");

// Router
const catsRouter = require("./routes/cats032_route");
const categoriesRouter = require("./routes/categories032_route");
const usersRouter = require("./routes/users032_route");
const authRouter = require("./routes/auth032_route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Session
app.use(
    session({
      secret: "secret",
      saveUninitialized: false,
      resave: false,
    })
  );

app.use(flash());

// app.use((req, res, next) => {
//   res.locals.success = req.flash('success');
//   res.locals.failed = req.flash('failed');
//   next();
// });

// Set directory for view files and view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Call router
app.use("/cats", catsRouter)
app.use("/categories", categoriesRouter)
app.use("/users", usersRouter)
app.use("/auth", authRouter)

// Get root (/) and render with home_menu_032 file
app.get("/", (req, res) => {
  if (req.session && req.session.user) {
    res.render("home_menu_032", {user: req.session.user});
  } else {
    res.redirect("/auth/login")
  }
})

// Check if server is running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
