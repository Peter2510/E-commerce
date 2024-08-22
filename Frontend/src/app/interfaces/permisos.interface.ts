export interface tipopermiso {
  id: number;
  tipo: string;
}

export interface permisousuario {
  id_empleado: number;
  id_permiso: tipopermiso;
}
