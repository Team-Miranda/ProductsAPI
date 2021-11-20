/* Table 'features' */
CREATE TABLE IF NOT EXISTS features(
  id integer NOT NULL,
  products_id integer NOT NULL,
  feature varchar,
  "value" varchar,
  PRIMARY KEY(id)
);

/* Relation 'products_products_features' */
ALTER TABLE features
  ADD CONSTRAINT products_products_features
    FOREIGN KEY (products_id) REFERENCES products (id);

COPY features FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/features.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_product_features
ON features(products_id)