export const Message = (data: any) => ` <div class="flex items-end justify-end">
<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end m-4">
   <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">${data.message}</span></div>
</div>
</div>`;
export const MessageOther = (data: any) => `<div class="flex items-end ">
<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start m-4">
   <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">${data.message}</span></div>
</div>
</div>`