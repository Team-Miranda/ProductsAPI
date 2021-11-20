SET check_function_bodies = false;

/* Table 'products' */
CREATE TABLE IF NOT EXISTS products(
  id integer NOT NULL,
  "name" varchar,
  slogan varchar,
  description varchar,
  category varchar,
  default_price varchar,
  PRIMARY KEY(id)
);

/* Table 'features' */
CREATE TABLE IF NOT EXISTS features(
  id integer NOT NULL,
  products_id integer NOT NULL,
  feature varchar,
  "value" varchar,
  PRIMARY KEY(id)
);

/* Table 'related_products' */
CREATE TABLE IF NOT EXISTS related_products(
  id integer NOT NULL,
  current_product_id integer NOT NULL,
  related_product_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'styles' */
CREATE TABLE IF NOT EXISTS styles(
  id integer NOT NULL,
  products_id integer NOT NULL,
  "name" varchar,
  sale_price varchar,
  original_price varchar,
  "default?" bool,
  PRIMARY KEY(id)
);

/* Table 'photos' */
CREATE TABLE IF NOT EXISTS photos(
  id integer NOT NULL,
  style_id integer NOT NULL,
  url varchar,
  thumbnail_url varchar,
  PRIMARY KEY(id)
);

/* Table 'skus' */
CREATE TABLE IF NOT EXISTS skus(
  id integer NOT NULL,
  style_id integer NOT NULL,
  size varchar,
  quantity integer,
  PRIMARY KEY(id)
);

/* Relation 'products_styles' */
ALTER TABLE styles
  ADD CONSTRAINT products_styles
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'styles_photos' */
ALTER TABLE photos
  ADD CONSTRAINT styles_photos FOREIGN KEY (style_id) REFERENCES styles (id);

/* Relation 'products_products_features' */
ALTER TABLE features
  ADD CONSTRAINT products_products_features
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'styles_skus' */
ALTER TABLE skus
  ADD CONSTRAINT styles_skus FOREIGN KEY (style_id) REFERENCES styles (id);

/* Relation 'products_related_products' */
ALTER TABLE related_products
  ADD CONSTRAINT products_related_products
    FOREIGN KEY (current_product_id) REFERENCES products (id);


COPY products FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/product.csv' DELIMITER ',' CSV HEADER;

COPY features FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/features.csv' DELIMITER ',' CSV HEADER;

COPY related_products FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/related.csv' DELIMITER ',' CSV HEADER;

COPY styles FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/styles.csv' DELIMITER ',' CSV HEADER;

COPY photos FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/photos.csv' DELIMITER ',' CSV HEADER;

COPY skus FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/skus.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_photo_style
ON photos(style_id);

CREATE INDEX idx_sku_style
ON skus(style_id);

CREATE INDEX idx_related_products
ON related_products(current_product_id);

CREATE INDEX idx_product_styles
ON styles(products_id);

CREATE INDEX idx_product_features
ON features(products_id)