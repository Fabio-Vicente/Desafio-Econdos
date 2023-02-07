import type { IFriend } from '../core';

export default interface IFriendProviderValue {
  friends: IFriend[]
  insertFriend: (friend: IFriend) => void
  deleteFriend: (index: number) => void
  updateFriend: (friend: IFriend, index: number) => void
}
