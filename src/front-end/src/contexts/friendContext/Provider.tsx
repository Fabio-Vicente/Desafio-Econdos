import React, {
  useState, useMemo, type ReactElement, type ReactNode,
} from 'react';
import friendContext from '.';
import type IFriend from '../../contracts/core/IFriend';

export default function FriendProvider({ children }: { children: ReactNode }): ReactElement {
  const [friends, setFriends] = useState<IFriend[]>([]);

  const contextValue = useMemo(() => {
    const insertFriend = (friend: IFriend): void => {
      setFriends([...friends, friend]);
    };

    const deleteFriend = (index: number): void => {
      setFriends([...friends.slice(0, index), ...friends.slice(index + 1)]);
    };

    const updateFriend = (friend: IFriend, index: number): void => {
      setFriends([...friends.slice(0, index), friend, ...friends.slice(index + 1)]);
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
