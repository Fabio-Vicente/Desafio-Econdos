import { type Express } from 'express';

export default interface IApp {
  app: Express

  config: () => void
  start: (port: number) => void
}
