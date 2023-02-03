import { type IError } from '../interfaces';
import ErrorCatalog from './ErrorCatalog';

export default class Error implements IError {
  code: number;

  message: string;

  static catalog = ErrorCatalog;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
