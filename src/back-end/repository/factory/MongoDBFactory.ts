import mongoose, { type Model } from 'mongoose';
import { type IRepository } from '../../interfaces';

type ObjectId = mongoose.Types.ObjectId;

export default abstract class
MongoDBFactory<T extends { _id: ObjectId | string }> implements IRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async Get(id: ObjectId | string): Promise<T | null> {
    return this.model.findOne(new mongoose.Types.ObjectId(id));
  }

  async GetAll(): Promise<T[]> {
    return this.model.find();
  }

  async Create(friend: T): Promise<T> {
    return this.model.create(friend);
  }

  async Update(friend: T): Promise<T | null> {
    const updateResponse = await this.model.updateOne({ _id: friend._id }, { $set: { ...friend } });

    if (updateResponse.matchedCount === 0) {
      return null;
    }

    return friend;
  }

  async Delete(friend: T): Promise<T | null> {
    const deleteResponse = await this.model.deleteOne({ _id: friend._id });

    if (deleteResponse.deletedCount !== 1) {
      return null;
    }

    return friend;
  }
}
