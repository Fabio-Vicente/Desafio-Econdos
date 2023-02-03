import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import type Error from '../error';

export default function ErrorMiddleware(
  error: Error | ZodError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  if (error instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.issues[0].message });
    return;
  }

  res
    .status(error.code ?? StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: error.message ?? 'Internal Server Error' });
}
