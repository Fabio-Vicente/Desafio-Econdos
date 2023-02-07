import { createContext } from 'react';
import type { IFriendProviderValue } from '../../contracts/providers';

const defaultProviderValue: IFriendProviderValue = {
  friends: [],
  // eslint-disable-next-line no-console
  insertFriend: (friend) => { console.log(friend); },
  // eslint-disable-next-line no-console
  deleteFriend: (index) => { console.log(index); },
  // eslint-disable-next-line no-console
  updateFriend: (friend, index) => { console.log(friend, index); },
};

const friendContext = createContext(defaultProviderValue);

export default friendContext;
