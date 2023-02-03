import { type IError } from '../interfaces';
import ErrorCatalog from './ErrorCatalog';

export default class Error implements IError {
  code: number;

  static catalog = ErrorCatalog;

  constructor(code: number) {
    this.code = code;
  }
}
