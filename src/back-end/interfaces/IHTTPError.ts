import { type ErrorCatalog } from '../error';

export default interface IHTTPError {
  statusCode: number
  message: string | ErrorCatalog
}
