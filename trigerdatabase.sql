---- Adminlist
-------- alll update admlistdata sesuai update dari databaseallitem
DELIMITER //

CREATE TRIGGER after_update_product_and_code1_2_C5
AFTER UPDATE ON databaseallitem
FOR EACH ROW
BEGIN
    -- Update item dan history jika nama produk berubah
    IF NEW.product <> OLD.product THEN
        UPDATE admlistdata
        SET 
            item = CASE 
                WHEN item = OLD.product THEN NEW.product 
                ELSE item 
            END,
            history = CASE 
                WHEN history LIKE CONCAT('%', OLD.product, '%') 
                THEN REPLACE(history, OLD.product, NEW.product)
                ELSE history
            END
        WHERE item = OLD.product OR history LIKE CONCAT('%', OLD.product, '%');
    END IF;

    -- Update code1 jika berubah
    IF NEW.code1 <> OLD.code1 THEN
        UPDATE admlistdata
        SET code1 = NEW.code1
        WHERE item = OLD.product OR item = NEW.product;
    END IF;

    -- Update code2 jika berubah
    IF NEW.code2 <> OLD.code2 THEN
        UPDATE admlistdata
        SET code2 = NEW.code2
        WHERE item = OLD.product OR item = NEW.product;
    END IF;

    -- Update stockprodukcode (kode item C5) jika berubah
    IF NEW.stockprodukcode <> OLD.stockprodukcode THEN
        UPDATE admlistdata
        SET stockprodukcode = NEW.stockprodukcode
        WHERE item = OLD.product OR item = NEW.product;
    END IF;
END;
//

DELIMITER ;

----after_update_product_and_code1_2_C5_to_masalah sama dengan di atas


---after_update_product_to_stockup
BEGIN
    -- Update item dan history jika nama produk berubah
    IF NEW.product <> OLD.product THEN
        UPDATE stockupholsterydatabase
        SET 
            item = CASE 
                WHEN item = OLD.product THEN NEW.product 
                ELSE item 
            END,
            history = CASE 
                WHEN history LIKE CONCAT('%', OLD.product, '%') 
                THEN REPLACE(history, OLD.product, NEW.product)
                ELSE history
            END
        WHERE item = OLD.product OR history LIKE CONCAT('%', OLD.product, '%');
    END IF;

END

---after_update_product_to_stokc5
BEGIN
    -- Update item dan history jika nama produk berubah
    IF NEW.product <> OLD.product THEN
    UPDATE formstockcalculate
    SET 
        item = CASE 
            WHEN item = OLD.product THEN NEW.product 
            ELSE item 
        END,
        keterangan = CASE  
            WHEN keterangan LIKE CONCAT('%', OLD.product, '%')  
            THEN REPLACE(keterangan, OLD.product, NEW.product)
            ELSE keterangan
        END
    WHERE item = OLD.product 
       OR keterangan LIKE CONCAT('%', OLD.product, '%');
END IF;


END

--- update data bank limbo selesai jika nama produk berubah
BEGIN
    -- Jalankan hanya jika nama produk berubah
    IF NEW.product <> OLD.product THEN
        -- Update setiap baris yang kolom 'details'-nya mengandung nama produk lama
        UPDATE finance_banklimbo
        SET details = REPLACE(details, OLD.product, NEW.product)
        WHERE details LIKE CONCAT('%', OLD.product, '%');
    END IF;
END