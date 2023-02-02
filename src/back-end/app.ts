import express, { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type IApp } from './interfaces';

class App implements IApp {
  app: express.Express = express();

  constructor() {
    this.config();

    this.app.get('/', (_req, res: Response) => res.status(StatusCodes.OK).json({ OK: true }));
  }

  config(): void {
    this.app.use(express.json());
  }

  start(port: number): void {
    // eslint-disable-next-line no-console
    this.app.listen(port, () => { console.log(`Running on port ${port}`); });
  }
}

export default App;
