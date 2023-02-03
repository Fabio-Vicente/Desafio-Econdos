/* eslint-disable no-underscore-dangle */
import mongoose, { Schema, type Model } from 'mongoose';
import type { IFriend } from '../interfaces/core';
import MongoDBFactory from './factory/MongoDBFactory';

const schema = new Schema<IFriend>();

export default class FriendRepository extends MongoDBFactory<IFriend> {
  constructor(readonly model: Model<IFriend> = mongoose.model('Friends', schema)) {
    super(model);
  }
}
