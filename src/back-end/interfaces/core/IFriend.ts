import type mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

export default interface IFriend {
  _id?: ObjectId | string
  name: string
  email: string
  secretFriend?: ObjectId | string
}
