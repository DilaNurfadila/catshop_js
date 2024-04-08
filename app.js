const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// Flash message library
const flash = require("connect-flash");
const session = require("express-session");

// Router
const catsRouter = require("./routes/cats032_route");
const categoriesRouter = require("./routes/categories032_route");
const usersRouter = require("./routes/users032_route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Session for flash
app.use(
    session({
      secret: "secret",
      saveUninitialized: true,
      resave: true,
    })
  );

app.use(flash());

// Set directory for view files and view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Call router
app.use("/cats", catsRouter)
app.use("/categories", categoriesRouter)
app.use("/users", usersRouter)

// Get root (/) and render with home_menu_032 file
app.get("/", (req, res) => {
    res.render("home_menu_032");
})

// Check if server is running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
