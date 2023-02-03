import App from './app';
import connectDatabse from './database/MongoConnection';
import { type IApp } from './interfaces';

const port: number = Number(process.env.BACKEND_PORT);

const app: IApp = new App();

void connectDatabse().then(() => { app.start(port); });
