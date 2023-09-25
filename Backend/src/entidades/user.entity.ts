import crypto from 'node:crypto'

export class User {
  constructor(
    public nombre: string,
    public apellido: string,
    public dni: number,
    public telefono: number,
    public contraseña: string,
    public contraseña2: string,
    public id = crypto.randomUUID()
  ) {}
}