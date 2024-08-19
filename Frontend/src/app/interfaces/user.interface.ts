import { Person } from "./person.interface";
export interface User{
    id: number,
    nombre: string,
    password:string,
    person:Person|undefined,
    activo:boolean,
    idtipoUsuario:number
}