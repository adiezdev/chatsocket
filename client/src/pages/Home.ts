import { SocketMain } from "../class/socket";
import { redirect } from "../utils/redirect";
import { toastErr } from "../components/Toast";

export const Home = (app: any) => {
  app.innerHTML = `
      <div class="form flex h-screen">
        <div class="m-auto">
            <h1 class="text-4xl	">Introduzca los datos del Chat</h1><br/>
            <input class=" bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="Nombre">
            <input class=" bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="room" id="room" placeholder="Nombre de la sala">
            <button id="btn"class="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300" type="submit">Entrar</button>
        </div>
      </div>
      `;

  const btnEntrar = document.querySelector<HTMLInputElement>("#btn")!;

  btnEntrar.onclick = () => {
    
    const username = document.querySelector<HTMLInputElement>("#username")!.value;
    const room = document.querySelector<HTMLInputElement>("#room")!.value;

    if (username && room) {
      SocketMain.emitLogin({ name: username, room: room });
      const a = `/chat?username=${username}&room=${room}`;
      window.history.pushState(null, "nextTitle", a);
      redirect();
    } else {
      SocketMain.onToastError((err: any) => {
        const div = document.createElement("div");
        div.innerHTML = toastErr(err);
        document.querySelector<HTMLDivElement>("#error")!.appendChild(div);

        setTimeout(() => {
          div.remove();
        }, 1000);
      });
    }
  };
};
