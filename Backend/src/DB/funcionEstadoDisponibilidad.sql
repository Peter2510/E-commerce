CREATE OR REPLACE FUNCTION estadoDisponibilidad()
RETURNS TRIGGER
AS $$
DECLARE
    estadoInventario int;
    estadoMinimo int;
BEGIN
    SELECT "minimoInventario" 
    FROM catalogo.producto 
    WHERE id = OLD.idproducto INTO estadoMinimo;

    IF  (NEW.cantidadtotal > 0 AND NEW.cantidadtotal <= estadoMinimo) THEN
        estadoInventario := 3; 
    ELSIF (NEW.cantidadtotal > estadoMinimo) THEN 
        estadoInventario := 1;  
        
    ELSIF (NEW.cantidadtotal <= 0) THEN
        estadoInventario := 2; 
    END IF;

    UPDATE inventario.inventario
    SET idestadoinventario = estadoInventario
    WHERE idproducto = NEW.idproducto;  

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;