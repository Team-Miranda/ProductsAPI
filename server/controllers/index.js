const helpers = require("../helpers");
const models = require("../models");
const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = {
  checkCache: (req, res, next) => {
    if (cache.has(req.path)) {
      res.status(200).send(cache.get(req.path));
    } else {
      next();
    }
  },

  getProducts: (req, res) => {
    let { page, count } = req.query;
    page = page === undefined ? 1 : page;
    count = count === undefined ? 10 : count;
    models
      .getProducts(page, count)
      .then(({ rows: productData }) => {
        res.status(200).json(productData);
      })
      .catch((err) => res.status(500).send(err));
  },

  getProduct: (req, res) => {
    let { product_id } = req.params;
    models
      .getProduct(product_id)
      .then((data) => {
        const products = helpers.formatProductData(data);
        // const [products, features] = data.map((snip) => snip.rows);
        // products.features = features;
        cache.set(req.path, products);
        res.status(200).json(products);
      })
      .catch((err) => res.status(500).send(err));
  },

  getStyles: (req, res) => {
    let { product_id } = req.params;
    models
      .getStyles(product_id)
      .then(({ rows: data }) => {
        cache.set(req.path, data[0]);
        res.status(200).json(data[0]);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getRelated: (req, res) => {
    let { product_id } = req.params;
    models
      .getRelated(product_id)
      .then(({ rows }) => {
        const related_ids = rows.map(
          ({ related_product_id }) => related_product_id
        );
        cache.set(req.path, related_ids);
        res.status(200).json(related_ids);
      })
      .catch((err) => {
        res.send(500).send(err);
      });
  },
};
