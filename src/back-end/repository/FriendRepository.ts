import mongoose, { Schema, type Model } from 'mongoose';
import type { IFriend } from '../interfaces/core';
import MongoDBFactory from './factory/MongoDBFactory';

const schema = new Schema<IFriend>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  secretFriend: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
}, {
  versionKey: false,
});

export default class FriendRepository extends MongoDBFactory<IFriend> {
  constructor(readonly model: Model<IFriend> = mongoose.model('Friends', schema)) {
    super(model);
  }
}
