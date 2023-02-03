import { type IRepository } from '../interfaces';
import type { IFriend } from '../interfaces/core';
import FriendRepository from '../repository/FriendRepository';
import EntityServiceFactory from './factory/EntityServiceFactory';

export default class FriendService extends EntityServiceFactory<IFriend> {
  constructor(readonly _repository: IRepository<IFriend> = new FriendRepository()) {
    super(_repository);
  }
}
