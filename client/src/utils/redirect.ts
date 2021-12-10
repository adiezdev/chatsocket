import {routes}  from '../data/routes';

export const redirect = () =>{
    const app = document.querySelector<HTMLDivElement>("#app")!;
    
    routes.find(route => route.path === window.location.pathname)?.component(app);
}
