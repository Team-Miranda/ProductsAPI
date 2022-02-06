module.exports = {
  stylesDataFormatter: (id, styles, photos, skus) => {
    styles.forEach((style) => {
      style["photos"] = [];
      style["skus"] = {};
      photos.forEach((photo, i) => {
        if (photo.style_id === style.id) {
          style.photos.push({
            thumbnail_url: photo.thumbnail_url,
            url: photo.url,
          });
        }
      });
      skus.forEach((sku, i) => {
        if (sku.style_id === style.id) {
          style.skus[sku.id] = {
            size: sku.size,
            quantity: sku.quantity,
          };
        }
      });
    });
    return {
      product_id: id,
      results: styles,
    };
  },
  formatProductData: (data) => {
    const [products, features] = data.map((snip) => snip.rows);
    products.features = features;
    return products;
  },
};
