var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

// const { PORT, ENVIORONMENT } = process.env;

const db = require("./configs/db.config");

// require routes
var indexRoutes = require("./routes/index");
var usersRoutes = require("./routes/users");

var app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes(db));

module.exports = app;
