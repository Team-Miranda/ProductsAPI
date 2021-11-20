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
