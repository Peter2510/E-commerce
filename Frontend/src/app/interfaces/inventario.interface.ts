import { Producto } from './producto.interface';
import { User } from './user.interface';

export interface inventario {
  id?: number;
  idestadoinventario: number;
  idproducto: number;
  cantidadtotal: number;
}

export interface estadoinventario {
  id?: number;
  estado: string;
}

export interface registroinventario {
  id?: number;
  idproducto: Producto;
  cantidad: number;
  fechaingreso: Date;
  id_empleado: User;
}
