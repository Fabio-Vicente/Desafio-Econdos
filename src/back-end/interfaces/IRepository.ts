import { type ObjectId } from 'mongoose';

export default interface IRepository<T> {
  Get: (id: ObjectId) => Promise<T | null>
  GetAll: () => Promise<T[]>
  Create: (friend: T) => Promise<T>
  Update: (friend: T) => Promise<T | null>
  Delete: (friend: T) => Promise<T | null>
}
