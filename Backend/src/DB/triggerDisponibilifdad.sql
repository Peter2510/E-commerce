CREATE
OR
REPLACE
    TRIGGER disponibilidad AFTER
UPDATE ON inventario.inventario FOR EACH ROW
EXECUTE FUNCTION estadoDisponibilidad ();