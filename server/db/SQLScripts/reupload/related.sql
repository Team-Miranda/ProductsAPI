/* Table 'related_products' */
CREATE TABLE IF NOT EXISTS related_products(
  id integer NOT NULL,
  current_product_id integer NOT NULL,
  related_product_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Relation 'products_related_products' */
ALTER TABLE related_products
  ADD CONSTRAINT products_related_products
    FOREIGN KEY (current_product_id) REFERENCES products (id);

COPY related_products FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/related.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_related_products
ON related_products(current_product_id);