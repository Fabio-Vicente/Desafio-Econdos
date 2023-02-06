import React, {
  type ReactElement, useContext, useState, useEffect,
} from 'react';
import friendContext from '../contexts/friendContext';
import type { IFriend } from '../contracts/core';

export default function InsertEntry({ name, email, index }: InsertEntryProps): ReactElement {
  const { deleteFriend, updateFriend } = useContext(friendContext);

  const [currentName, setCurrentName] = useState<string>(name);
  const [currentEmail, setCurrentEmail] = useState<string>(email);
  const [currentFriend, setCurrentFriend] = useState<IFriend>({ name, email });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setCurrentFriend({ name: currentName, email: currentEmail });
  }, [currentName, currentEmail]);

  return (
    <tr>
      {
        isEditing
          ? (
            <td>
              <input
                value={currentName}
                onChange={({ target: { value } }) => { setCurrentName(value); }}
              />
            </td>
          )
          : (
            <td>{name}</td>
          )
      }
      {
        isEditing
          ? (
            <td>
              <input
                value={currentEmail}
                onChange={({ target: { value } }) => { setCurrentEmail(value); }}
              />
            </td>
          )
          : (
            <td>{email}</td>
          )
      }
      {
        isEditing
          ? (
            <button type="button" onClick={() => { updateFriend(currentFriend, index); }}>
              Ok
            </button>
          )
          : (
            <>
              <button type="button" onClick={() => { setIsEditing(true); }}>/</button>
              <button type="button" onClick={() => { deleteFriend(index); }}>X</button>
            </>
          )
      }
    </tr>
  );
}

interface InsertEntryProps {
  name: string
  email: string
  index: number
}
