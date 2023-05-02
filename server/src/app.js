const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const dbMongo = require("./db");

dbMongo();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/users.routes"));

module.exports = app;
