const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

let app = express();

const db = require("./configs/db.config");

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// require routes
let indexRoutes = require("./routes/index");
let usersRoutes = require("./routes/users");
let mentorsRoutes = require("./routes/mentors");
let mentorsIdRoutes = require("./routes/mentors_id");
let mentorsEditRoutes = require("./routes/mentors_edit");
let registerRoutes = require("./routes/register");
let loginRoutes = require("./routes/login");
let favouriteRoutes = require("./routes/favourites");

// routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes(db));
app.use("/mentors", mentorsRoutes(db));
app.use("/mentors", mentorsIdRoutes(db));
app.use("/mentors", mentorsEditRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/favourites", favouriteRoutes(db));

module.exports = app;
