CREATE OR REPLACE FUNCTION estadoDisponibilidad()
RETURNS TRIGGER
AS $$
DECLARE
    estadoInventario int;
    estadoMinimo int;
BEGIN
    -- Obtener el mínimo inventario del producto
    SELECT "minimoInventario" 
    INTO estadoMinimo
    FROM catalogo.producto 
    WHERE id = OLD.idproducto;

    -- Evaluar el estado del inventario basado en la cantidad total
    IF  (NEW.cantidadtotal > 0 AND NEW.cantidadtotal <= estadoMinimo) THEN
        estadoInventario := 3;  -- Inventario en estado crítico
    ELSIF (NEW.cantidadtotal > estadoMinimo) THEN 
        estadoInventario := 1;  -- Inventario suficiente
    ELSIF (NEW.cantidadtotal <= 0) THEN
        estadoInventario := 2;  -- Sin inventario
    END IF;

    IF NEW.idestadoinventario != estadoInventario THEN
        UPDATE inventario.inventario
        SET "idestadoinventario" = estadoInventario
        WHERE "idproducto" = NEW.idproducto;

       
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;