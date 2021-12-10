type TUser = {
  id: string;
  name: string;
  room: string;
}
export class Users {
    private  users: Array<TUser> = [];
  constructor() {}

  public addUser( id:string, name:string, room: string ): any {
    const existUser = this.users.find(
      (user) => user.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (existUser) return { error: "El Usuario ya existe" };
    if (!name && !room) return { error: "Rellene los campos" };
    if(!name) return { error: "El Nombre es requerido" };
    if(!room) return { error: "El nombre de la sala es requerido" };

    const user = { id, name, room };
    this.users.push(user);
    
    return {user};
  }

  public getUser(id: string): any{
    return this.users.find((user) => user.id === id);

  }
  
  public removeUser(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) this.users.splice(index, 1);
  }

  public getUsersListRoom(room: string): Array<TUser> {
      return this.users.filter((user) => user.room === room)
  }
}
