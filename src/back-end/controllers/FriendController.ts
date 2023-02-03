import ControllerFactory from './factory/ControllerFactory';
import FriendService from '../services/FriendService';
import { type IValidateMiddleware, type IEntityService } from '../interfaces';
import { type IFriend } from '../interfaces/core';
import { FriendValidateMiddleware } from '../middlewares';

export default class FriendController extends ControllerFactory<IFriend> {
  constructor(
    readonly friendService: IEntityService<IFriend> = new FriendService(),
    readonly validationFriendMiddleware: IValidateMiddleware<IFriend> =
    new FriendValidateMiddleware(),
  ) {
    super(friendService);
  }
}
