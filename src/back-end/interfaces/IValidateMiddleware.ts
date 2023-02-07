import { type NextFunction, type Request, type Response } from 'express';

export default interface IValidateMiddleware<T> {
  validateContent: (req: Request<T>, res: Response, next: NextFunction) => void
  validateId?: (req: Request, res: Response, next: NextFunction) => void
}
