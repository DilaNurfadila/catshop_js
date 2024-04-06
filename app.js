const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const catsRouter = require("./routes/cats032_route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
    session({
      secret: "secret",
      saveUninitialized: true,
      resave: true,
    })
  );

  app.use(flash());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/cats", catsRouter)
app.get("/", (req, res) => {
    res.render("home_menu_032");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
