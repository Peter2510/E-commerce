CREATE
OR
REPLACE
    TRIGGER disponibilidad_update AFTER
UPDATE ON inventario.inventario FOR EACH ROW WHEN (
    OLD.cantidadtotal IS DISTINCT
    FROM NEW.cantidadtotal
)
EXECUTE FUNCTION estadoDisponibilidad ();