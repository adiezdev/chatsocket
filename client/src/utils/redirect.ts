import {routes}  from '../data/routes';

export const redirect = (a:any = `/`, args: any = ``) =>{
    
    const app = document.querySelector<HTMLDivElement>("#app")!;
    
    routes.find(route => route.path === a)?.component(app);
    window.history.pushState({}, "", `${a}${args}`);
}
