const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 3000;


const app = express();
const sessionRouter = require('./src/routers/sessionRouter')
const adminRouter = require('./src/routers/adminRouter')

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views/");
app.set("view engine", "ejs");

app.use("/sessions", sessionRouter);
app.use("/admin", adminRouter);


app.get("/", (req, res) => {
  res.render("index", {});
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
