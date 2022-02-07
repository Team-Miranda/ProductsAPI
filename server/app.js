const express = require("express");
const path = require("path");

const db = require("./db");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use("/products", router);
app.use(express.static("public"));

module.exports = app;
