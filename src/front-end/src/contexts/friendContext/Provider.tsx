import React, {
  useState, useMemo, type ReactElement, type ReactNode,
} from 'react';
import friendContext from '.';
import type IFriend from '../../contracts/core/IFriend';
import { createFriendRegister, deleteFriendRegister, updateFriendRegister } from '../../services/BackendRequest';

export default function FriendProvider({ children }: { children: ReactNode }): ReactElement {
  const [friends, setFriends] = useState<IFriend[]>([]);

  const contextValue = useMemo(() => {
    const insertFriend = async (friend: IFriend): Promise<void> => {
      const registeredFriend: IFriend = await createFriendRegister(friend);
      setFriends([...friends, registeredFriend]);
    };

    const deleteFriend = async (index: number): Promise<void> => {
      await deleteFriendRegister(friends[index]);
      setFriends([...friends.slice(0, index), ...friends.slice(index + 1)]);
    };

    const updateFriend = async (friend: IFriend, index: number): Promise<void> => {
      const updatedFriend = { ...friend, _id: friends[index]._id };
      await updateFriendRegister(updatedFriend);
      setFriends([...friends.slice(0, index), updatedFriend, ...friends.slice(index + 1)]);
    };

    return {
      friends,
      insertFriend,
      deleteFriend,
      updateFriend,
    };
  }, [friends]);

  return (
    <friendContext.Provider value={contextValue}>
      { children }
    </friendContext.Provider>
  );
}
