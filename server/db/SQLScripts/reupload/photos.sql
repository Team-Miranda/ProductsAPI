/* Table 'photos' */
CREATE TABLE IF NOT EXISTS photos(
  id integer NOT NULL,
  style_id integer NOT NULL,
  url varchar,
  thumbnail_url varchar,
  PRIMARY KEY(id)
);

/* Relation 'styles_photos' */
ALTER TABLE photos
  ADD CONSTRAINT styles_photos FOREIGN KEY (style_id) REFERENCES styles (id);

COPY photos FROM '/Users/amitt_dosanjh/SDC/ProductsAPI/CSV/photos.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_photo_style
ON photos(style_id);