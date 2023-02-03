import { type ObjectId } from 'mongoose';

export default interface IFriend {
  _id: ObjectId | string
  name: string
  email: string
  secretFriend: ObjectId | string
}
