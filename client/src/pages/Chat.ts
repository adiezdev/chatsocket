import { SocketMain } from '../class/socket'
import { Message, MessageOther } from "../components/Messages";
import { toastInfo } from "../components/Toast";
import { redirect } from '../utils/redirect';


export const Chat = (app: any) => {
  const params = parselocationSearch(window.location.search);

  SocketMain.onMessage((data: any) => {
    const div = document.createElement("div");
      div.classList.add("messagesInput");
      params.get("username") === data.name
        ? (div.innerHTML = Message(data))
        : (div.innerHTML = MessageOther(data));

      document
        .querySelector<HTMLDivElement>("#messagesInput")!
        .appendChild(div);
  });
  SocketMain.onNotification((data: any)=>{
    console.log("Emit notification", data);
      
      const div = document.createElement("div");
      div.innerHTML = toastInfo({...data})

      document
        .querySelector<HTMLDivElement>("#notification")!
        .appendChild(div);
      
      setTimeout(() => {
        div.remove();
      }, 2000);
  });

  app.innerHTML = `
  <div class="w-10 h-auto m-8" id="back">
        <div class="flex-1 h-full cursor-pointer ">
          <div class="flex items-center justify-center flex-1 h-full p-2 bg-blue-800 text-white shadow rounded-full">
            <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            </div>
          </div>
        </div>
      </div>
  <div class=" flex h-screen">
  <div id="notification"></div>
    <div class="flex flex-col items-center w-full p-4">
      <div class="border border-blue-200		bg-white border-gray-500 px-52 rounded-md">
        <p class="text-2xl text-center">${params.get("room")}</p><br/>
      <div class="flex flex-row items-center justify-center">
        <p class="text-gray-500 text-sm">${params.get("username")}</p>
        <div class="rounded-full h-2 w-2 bg-green-300 mx-4"></div>
      </div>
    </div>
      <div id="messagesInput" class="bg-blue-50 p-4 w-128 h-128	"></div>
        <div class="p-4">
            <input
                type="text"
                id="message"
                class="bg-gray-100 w-96 px-4 py-2 rounded-lg focus:outline-none"
                placeholder="Envía un mensaje...."
            />
            <button id="btn" class="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300" type="submit">Enviar</button>
        </div>
    </div>  
  </div>`;

  const btnsend = document.querySelector<HTMLInputElement>("#btn")!;

  btnsend.onclick = () => {
    let message = document.querySelector<HTMLInputElement>("#message")!.value;
    if(message) {
  
      SocketMain.emitGetMessages({
        message: message,
        username: parselocationSearch(window.location.search).get("username"),
        room: parselocationSearch(window.location.search).get("room")
      });
    }
  }

  const btnback = document.querySelector<HTMLInputElement>("#back")!;

  btnback.onclick = () => {
    SocketMain.emitLogout();
    const a = `/`;
    window.history.pushState(null, "Home", a);
    redirect();
  }
};

function parselocationSearch(search: string) {
  const params = new URLSearchParams(search);
  return params;
}
