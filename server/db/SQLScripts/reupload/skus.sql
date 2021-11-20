/* Table 'skus' */
CREATE TABLE IF NOT EXISTS skus(
  id integer NOT NULL,
  style_id integer NOT NULL,
  size varchar,
  quantity integer,
  PRIMARY KEY(id)
);

/* Relation 'styles_skus' */
ALTER TABLE skus
  ADD CONSTRAINT styles_skus FOREIGN KEY (style_id) REFERENCES styles (id);

COPY skus FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/skus.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_sku_style
ON skus(style_id);