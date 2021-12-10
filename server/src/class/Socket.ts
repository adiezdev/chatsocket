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
      console.log(`Conexion ${socket.id} abierta ${socket}`);

      this.onLogin(socket);
      this.onGetMessages(socket);
      this.logout(socket);
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
    this.io.in(user.room).emit("message", { name: user.name, message: messages });
  }
  
  private notifyUser(socket: socketIO.Socket) {
    const user = this.user.getUser(socket.id)
    console.log(user.name + " se ha conectado a la sala " + user.room + " so.id"+socket.id + " id"+user.id);
    
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
      const user = this.user.getUser(socket.id);
      this.user.removeUser(socket.id);
      this.io.in(user.room).emit("notification", {
        title: "Alguien se ha desconectado",
        description: `${user.name} ha salido de la sala`,
      });
      this.io.in(user.room).emit("users", this.user.getUsersListRoom(user.room));
    });
    
  }
          
}
