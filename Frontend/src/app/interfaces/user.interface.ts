import { Person } from "./person.interface";
export interface User{
    id: number,
    nombre: string,
    username: string,
    password:string,
    person:Person,
    activo:boolean,
    idtipoUsuario:number
}