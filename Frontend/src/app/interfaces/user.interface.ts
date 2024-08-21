import { Person } from "./person.interface";
export interface User{
    id: number,
    nombreUsuario: string,
    contrasenia:string,
    persona:Person|undefined,
    activo:boolean,
    idTipoUsuario:number
}