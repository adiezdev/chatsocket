export const toastErr = (error: any) => `<div class='flex items-center text-white max-w-sm w-full bg-red-400 shadow-md rounded-lg overflow-hidden mx-auto'>
<div class='w-10 border-r px-2'>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636">
        </path>
    </svg>
</div>
<div class='flex items-center px-2 py-3'>
    <div class='mx-3'>
        <p>${error}</p>
    </div>
</div>
</div>`;

export const toastInfo = ({title, description }:any) =>`<div class='flex items-center text-white max-w-sm w-full bg-blue-400 shadow-md rounded-lg overflow-hidden mx-auto'>
<div class='w-10 border-r px-2'>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
</div>

<div class='flex items-center px-2 py-3'>


    <div class='mx-3'>
        <p>${title}</p>
        <p>${description}</p>
    </div>
</div>
</div>`