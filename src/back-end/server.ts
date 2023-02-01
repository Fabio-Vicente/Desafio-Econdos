import App from './app';
import { type IApp } from './interfaces';

const port: number = Number(process.env.BACKEND_PORT);

const app: IApp = new App();

app.start(port);
