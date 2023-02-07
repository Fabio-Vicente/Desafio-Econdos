import { type Schema } from 'zod';
import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';
import ValidateMiddlewareFactory from './factory/ValidateMiddlewareFactory';
import { type IFriend } from '../interfaces/core';
import { friendSchema } from '../schemas';
import { HTTPError } from '../error';

export default class FriendValidateMiddleware extends ValidateMiddlewareFactory<IFriend> {
  constructor(readonly schema: Schema = friendSchema) {
    super(schema);
  }

  static validateId(req: Request, _res: Response, next: NextFunction): void {
    const { id } = req.params;

    const validateId = isValidObjectId(id);
    if (!validateId) {
      next(new HTTPError(StatusCodes.BAD_REQUEST, 'Invalid id'));
      return;
    }

    next();
  }
}
