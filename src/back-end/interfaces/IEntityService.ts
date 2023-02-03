import { type ObjectId } from 'mongoose';
import type IError from './IError';

export default interface IEntityService<T> {
  ReadAllInstances: () => Promise<T[]>
  ReadOneInstance: (id: string | ObjectId) => Promise<T | IError>
  CreateInstance: (newInstance: T) => Promise<T>
  UpdateInstance: (changedInstance: T) => Promise<T | IError>
  DeleteInstance: (removedInstance: T) => Promise<T | IError>
}
