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