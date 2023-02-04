import type mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

export default interface IRepository<T> {
  Get: (id: ObjectId | string) => Promise<T | null>
  GetAll: () => Promise<T[]>
  Create: (friend: T) => Promise<T>
  Update: (friend: T) => Promise<T | null>
  Delete: (friend: T) => Promise<T | null>
  Clear: () => Promise<void>
}
