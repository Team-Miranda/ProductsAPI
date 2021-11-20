require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { PORT: port } = process.env;
const db = require("./db");
const { getProducts, getProduct, getStyles, getRelated } = require("./models");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// GET /products
app.get("/products", (req, res) => {
  let { page, count } = req.query;
  page = page === undefined ? 1 : page;
  count = count === undefined ? 10 : count;
  getProducts(page, count)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => res.status(500).send(err));
});

// GET /products/:product_id
app.get("/products/:product_id", (req, res) => {
  let { product_id } = req.params;
  getProduct(product_id)
    .then((data) => {
      const [products, features] = data.map((snip) => snip.rows);
      products.features = features;
      res.status(200).json(products);
    })
    .catch((err) => res.status(500).send(err));
});

// GET /products/:product_id/styles
app.get("/products/:product_id/styles", (req, res) => {
  let { product_id } = req.params;
  getStyles(product_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// GET /products/:product_id/related
app.get("/products/:product_id/related", (req, res) => {
  let { product_id } = req.params;
  getRelated(product_id)
    .then(({ rows }) => {
      const related_ids = rows.map(
        ({ related_product_id }) => related_product_id
      );
      res.status(200).json(related_ids);
    })
    .catch((err) => {
      console.error(err);
      res.send(500).send(err);
    });
});

app.listen(port, () => console.log(`👂 Listening on port ${port}`));
