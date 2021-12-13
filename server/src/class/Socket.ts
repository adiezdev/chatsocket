import socketIO from "socket.io";
import { Users } from "./Users";
import { Messages } from "./Messages";

export class Socket {
  private io: socketIO.Server;

  private user: Users;
  private messages: Messages;

  constructor(server: any) {
    this.user = new Users();
    this.messages = new Messages(this.user);

    this.io = new socketIO.Server(server);
    this.io.on("connection", (socket: socketIO.Socket) => {
      console.log(`Conexion ${socket.id} abierta`);

      this.onLogin(socket);
      this.onGetMessages(socket);
      this.logout(socket);

      this.disconnect(socket);
    });
  }

  private onLogin(socket: socketIO.Socket) {
    socket.on("login", (data: any) => {

      const { error, user } = this.user.addUser(
        socket.id,
        data.name,
        data.room
      );
      if (error) {
        socket.emit("toasterror", error);
      }
      //Metemos el usuario en la sala
      socket.join(data.room);
      //Notificamos a todos los usuarios de la sala
      this.notifyUser(socket);
      //Lista de usuarios en la misma sala
      this.getUsers(data.room, data.name);
    });
  }

  private onGetMessages(socket: socketIO.Socket) {
    socket.on("getMessages", (data: any) => {
      this.messages.addMessage(data.message, socket.id);
      this.emitMessage(socket, data.message);
    });
  }

  private emitMessage(socket: socketIO.Socket, messages: string) {
    const user = this.user.getUser(socket.id)    
    this.io.to(user.room).emit("message", { user: user.name, message: messages });
  }
  
  private notifyUser(socket: socketIO.Socket) {
    const user = this.user.getUser(socket.id)

    socket.in(user.room).emit("notification", {
      title: "Alguien se ha conectado",
      description: `${user.name} ha entrado en la sala`,
    });
    
  }

  private getUsers(room: string, name: string) {
     //Lista de usuarios en la misma sala
      this.io
      .in(room)
      .emit("users", this.user.getUsersListRoom(room));
  }
  
  private logout(socket: socketIO.Socket) {
    socket.on("logout", () => {
      this.disconect(socket);
    });
    
  }
  private disconnect(socket: socketIO.Socket) {
    socket.on("disconnect", () => {
      this.disconect(socket);
    });
  }
  
  private disconect(socket: socketIO.Socket){
    const user = this.user.getUser(socket.id);
    if(user !== undefined){

        this.messages.removeMessage(socket.id);
        this.user.removeUser(socket.id);
        this.io.in(user.room).emit("notification", {
          title: "Alguien se ha desconectado",
          description: `${user.name} ha salido de la sala`,
        });
        this.io.in(user.room).emit("users", this.user.getUsersListRoom(user.room));
        console.log("Se ha desconectado " + user.name); 
      } else {
        console.log("Se ha desconectado un usuario que no existe");
      }
  }
}
