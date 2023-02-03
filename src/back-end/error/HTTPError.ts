import { type IHTTPError } from '../interfaces';
import type ErrorCatalog from './ErrorCatalog';

export default class HTTPError implements IHTTPError {
  constructor(public statusCode: number, public message: string | ErrorCatalog) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
