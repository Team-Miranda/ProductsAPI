require("dotenv").config();

const express = require("express");
const path = require("path");

const db = require("./db");
const router = require("./routes");

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use("/products", router);
app.use(express.static("public"));

app.listen(PORT, () => console.log(`👂 Listening on PORT ${PORT}`));
