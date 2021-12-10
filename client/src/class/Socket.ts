import io, { Socket } from "socket.io-client";

export class SocketService {
  private static instance: SocketService;
  public socket: Socket = undefined!;

  init() {
    this.socket = io("ws://localhost:3001", {
      transports: ["websocket"],
      closeOnBeforeunload: false,
    });
  }

  public onToastError(callbalck: (error: any) => void) {
    this.socket.on("toasterror", (error: any) => {
      callbalck(error);
    });
  }

  public onMessage(callback: (data: any) => void) {
    this.socket.on("message", (data: any) => {
      callback(data);
    });
  }

  public onNotification(callback: (data: any) => void) {
    this.socket.on("notification", (data: any) => {
      callback(data)
    });
  }

  public onUsers( callback: (data: any) => void) {
    this.socket.on("users", (data: any) => {
      callback(data);
    });
  }

  public emitLogin(payload: Object) {
    this.socket.emit("login", payload);
  }
  public emitGetMessages(payload: Object) {
    this.socket.emit("getMessages", payload);
  }

  public emitLogout() {
    this.socket.emit("logout",);
  }

  public static new(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }

    return SocketService.instance;
  }
}

export const SocketMain = SocketService.new();
