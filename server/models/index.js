const pool = require("../db");
const Promise = require("bluebird");

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
      "SELECT style_id, thumbnail_url, url FROM photos WHERE style_id=$1;";
    const queryStringSKUs =
      "SELECT style_id, id, size, quantity FROM skus WHERE style_id=$1;";
    const photos = [];
    const skus = [];

    const getStylesWithData = async () => {
      try {
        const styles = await pool.query(queryStringStyles, [id]);
        for (const style of styles.rows) {
          photos.push(pool.query(queryStringPhotos, [style.id]));
          skus.push(pool.query(queryStringSKUs, [style.id]));
        }
        let result = await Promise.all([...photos, ...skus]);
        result = result.map((item) => item.rows);

        return [styles.rows, result];
      } catch (err) {
        return err;
      }
    };

    return getStylesWithData();
  },
  getRelated: (id) => {
    const queryString =
      "SELECT related_product_id FROM related_products WHERE current_product_id=$1;";

    return pool.query(queryString, [id]);
  },
};

// const queryStringJoin = `SELECT styles.id, styles.name, styles.original_price, styles.sale_price, styles."default?",
//     json_agg(json_build_object('url', photos.url, 'thumbnnail_url', photos.thumbnail_url)) AS photos,
//     json_agg(json_build_object('SKU', skus.id, 'quantity', skus.quantity, 'size', skus.size)) AS skus
//   FROM styles
//   LEFT JOIN photos ON styles.id = photos.style_id
//   LEFT JOIN skus ON styles.id = skus.style_id
//   WHERE styles.products_id = $1
//   GROUP BY styles.id;`;
