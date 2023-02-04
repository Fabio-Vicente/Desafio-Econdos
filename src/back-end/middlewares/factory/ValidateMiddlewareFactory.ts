import { type NextFunction, type Request, type Response } from 'express';
import { type Schema } from 'zod';
import { type IValidateMiddleware } from '../../interfaces';

export default abstract class ValidateMiddlewareFactory<T> implements IValidateMiddleware<T> {
  constructor(protected readonly _schema: Schema) {
    this.validateContent = this.validateContent.bind(this);
  }

  validateContent(req: Request<T>, _res: Response, next: NextFunction): void {
    const validation = this._schema.safeParse(req.body);

    if (!validation.success) {
      next(validation.error);
      return;
    }

    next();
  }
}
