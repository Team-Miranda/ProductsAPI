
COPY products FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/product.csv' DELIMITER ',' CSV HEADER;

COPY features FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/features.csv' DELIMITER ',' CSV HEADER;

COPY related_products FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/related.csv' DELIMITER ',' CSV HEADER;

COPY styles FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/styles.csv' DELIMITER ',' CSV HEADER;

COPY photos FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/photos.csv' DELIMITER ',' CSV HEADER;

COPY skus FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/skus.csv' DELIMITER ',' CSV HEADER;
