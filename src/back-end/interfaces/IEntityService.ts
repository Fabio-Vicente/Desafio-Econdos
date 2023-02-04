import type mongoose from 'mongoose';
import { type ErrorCatalog } from '../error';

type ObjectId = mongoose.Types.ObjectId;

export default interface IEntityService<T> {
  ReadAllInstances: () => Promise<T[]>
  ReadOneInstance: (id: string | ObjectId) => Promise<T | ErrorCatalog>
  CreateInstance: (newInstance: T) => Promise<T>
  UpdateInstance: (changedInstance: T) => Promise<T | ErrorCatalog>
  DeleteInstance: (removedInstance: T) => Promise<T | ErrorCatalog>
  ClearAllInstances: () => Promise<void>
}
