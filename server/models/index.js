const pool = require("../db");
const Promise = require("bluebird");
const { stylesDataFormatter } = require("../helpers");

module.exports = {
  getProducts: (page, count) => {
    const queryString = "SELECT * FROM products WHERE id BETWEEN $1 AND $2;";
    const values = [(page - 1) * count, count * page + (page - 1)];

    return pool.query(queryString, values);
  },
  getProduct: (id) => {
    const queryStringProduct = "SELECT * FROM products WHERE id=$1;";
    const queryStringFeatures =
      "SELECT feature, value FROM features WHERE products_id=$1;";
    const value = [id];

    const queries = [];
    queries.push(
      pool.query(queryStringProduct, value),
      pool.query(queryStringFeatures, value)
    );
    return Promise.all(queries);
  },
  getStyles: (id) => {
    const queryStringStyles =
      'SELECT id, name, original_price, sale_price, "default?" FROM styles WHERE products_id=$1;';
    const queryStringPhotos =
      "SELECT style_id, thumbnail_url, url FROM photos WHERE style_id BETWEEN $1 AND $2;";
    const queryStringSKUs =
      "SELECT style_id, id, size, quantity FROM skus WHERE style_id BETWEEN $1 AND $2;";
    const bigAssQueryString = `SELECT row_to_json(style) AS results
      FROM (
        SELECT a.id, a.name, a.original_price, a.sale_price, a."default?",
        (SELECT json_agg(photos)
          FROM (
            SELECT photos.url, photos.thumbnail_url FROM photos WHERE photos.style_id = a.id) photos) AS photos,
            (SELECT json_object_agg(
              s.id, (SELECT json_build_object("quantity", s.quantity, "size", s.size)
              FROM skus LIMIT 1)
            ) skus
            FROM skus s WHERE s.style_id=a.id)
            FROM styles AS a)
              style WHERE id=$1;`;

    return pool.query(bigAssQueryString, [id]);
  },
  getRelated: (id) => {
    const queryString =
      "SELECT related_product_id FROM related_products WHERE current_product_id=$1;";

    return pool.query(queryString, [id]);
  },
};
