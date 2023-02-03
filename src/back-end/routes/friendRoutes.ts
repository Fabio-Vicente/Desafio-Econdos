/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type RequestListener } from 'http';
import FriendController from '../controllers/FriendController';
import { FriendValidateMiddleware } from '../middlewares';

const friendRoutes = Router();
const friendsController = new FriendController();

friendRoutes.route('/friends')
  .get(friendsController.ReadAll)
  .post(friendsController.validationFriendMiddleware.validateContent, friendsController.Create)
  .put(
    FriendValidateMiddleware.validateId as RequestListener,
    friendsController.validationFriendMiddleware.validateContent,
    friendsController.Update,
  )
  .delete(
    friendsController.validationFriendMiddleware.validateContent,
    friendsController.Delete,
  );

friendRoutes.route('/friends/:id')
  .get(
    FriendValidateMiddleware.validateId as RequestListener,
    friendsController.ReadOne,
  );

export default friendRoutes;
