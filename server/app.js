let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

// const { PORT, ENVIORONMENT } = process.env;

const db = require("./configs/db.config");

// require routes
let indexRoutes = require("./routes/index");
let usersRoutes = require("./routes/users");
let mentorsRoutes = require("./routes/mentors");
let mentorsIdRoutes = require("./routes/mentors_id");
let mentorsEditRoutes = require("./routes/mentors_edit");

let app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes(db));
app.use("/mentors", mentorsRoutes(db));
app.use("/mentors", mentorsIdRoutes(db));
app.use("/mentors", mentorsEditRoutes(db));

module.exports = app;
