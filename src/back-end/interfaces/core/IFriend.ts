import { type ObjectId } from 'mongoose';

export default interface IFriend {
  _id: ObjectId
  name: string
  email: string
  secretFriend: ObjectId
}
