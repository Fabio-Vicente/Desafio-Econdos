import ControllerFactory from './factory/ControllerFactory';
import FriendService from '../services/FriendService';
import { type IEntityService } from '../interfaces';
import { type IFriend } from '../interfaces/core';

export default class FriendController extends ControllerFactory<IFriend> {
  constructor(readonly friendService: IEntityService<IFriend> = new FriendService()) {
    super(friendService);
  }
}
