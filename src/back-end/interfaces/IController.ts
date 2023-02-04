import { type Request, type NextFunction, type Response } from 'express';

export default interface IController<T> {
  ReadAll: (req: Request, res: Response<T[]>) => Promise<void>
  ReadOne: (req: Request, res: Response<T>, next: NextFunction) => Promise<void>
  Create: (req: Request<T>, res: Response<T>) => Promise<void>
  Update: (req: Request<T>, res: Response<T>, next: NextFunction) => Promise<void>
  Delete: (req: Request<T>, res: Response<T>, next: NextFunction) => Promise<void>
  ClearDB: (req: Request, res: Response) => Promise<void>
}
