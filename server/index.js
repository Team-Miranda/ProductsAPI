require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const NodeCache = require("node-cache");

const db = require("./db");
const { getProducts, getProduct, getStyles, getRelated } = require("./models");

const { PORT: port } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  compression({
    level: 6,
    threshold: 0,
  })
);

const cache = new NodeCache({ stdTTL: 100 });

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
  if (cache.has(product_id)) {
    res.status(200).json(cache.get(product_id));
    return;
  }
  getProduct(product_id)
    .then((data) => {
      const [products, features] = data.map((snip) => snip.rows);
      products.features = features;
      cache.set(product_id, products);
      res.status(200).json(products);
    })
    .catch((err) => res.status(500).send(err));
});

// GET /products/:product_id/styles
app.get("/products/:product_id/styles", (req, res) => {
  let { product_id } = req.params;
  if (cache.has(product_id + " styles")) {
    res.status(200).json(cache.get(product_id + " styles"));
    return;
  }
  getStyles(product_id)
    .then((data) => {
      cache.set(product_id + " styles", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// GET /products/:product_id/related
app.get("/products/:product_id/related", (req, res) => {
  let { product_id } = req.params;
  if (cache.has(product_id + " related")) {
    res.status(200).json(cache.get(product_id + " related"));
    return;
  }
  getRelated(product_id)
    .then(({ rows }) => {
      const related_ids = rows.map(
        ({ related_product_id }) => related_product_id
      );
      cache.set(product_id + " related", related_ids);
      res.status(200).json(related_ids);
    })
    .catch((err) => {
      console.error(err);
      res.send(500).send(err);
    });
});

app.listen(port, () => console.log(`👂 Listening on port ${port}`));
