import { type IError } from '../interfaces';
import ErrorCatalog from './ErrorCatalog';

export default class Error implements IError {
  code: number;

  message: string | null;

  static catalog = ErrorCatalog;

  constructor(code: number, message: string | null = null) {
    this.code = code;
    this.message = message;
  }
}
