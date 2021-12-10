import express , {Request, Response} from 'express';
import {Socket} from './class/Socket';

import http from 'http'
const port: number = 3001

export class Server {
    private server: http.Server
    public port: number

    constructor(port: number) {
        
        this.port = port;
        const app = express();
        
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        this.server = new http.Server(app)
        
        new Socket(this.server)
        
        app.get('/', (req: Request, res: Response) => {
            res.status(200).send(`Server levantado en el puerto ${this.port}`);
        });
    }

    public Start(): void {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

new Server(port).Start();