import React, {
  useContext, useEffect, useState, type ReactElement,
} from 'react';
import friendContext from '../contexts/friendContext';
import type { IFriend } from '../contracts/core';

export default function InsertLine(): ReactElement {
  const { insertFriend } = useContext(friendContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [friend, setFriend] = useState<IFriend>({ name: '', email: '' });
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const clearFields = (): void => {
    setName('');
    setEmail('');
    setFriend({ name: '', email: '' });
  };

  const createFriend = (newFriend: IFriend): void => {
    insertFriend(newFriend);
    clearFields();
  };

  useEffect(() => {
    setFriend({ name, email });
    setIsDisable(name === '' || email === '');
  }, [name, email]);

  return (
    <tr>
      <td><input value={name} onChange={({ target: { value } }) => { setName(value); }} /></td>
      <td><input value={email} onChange={({ target: { value } }) => { setEmail(value); }} /></td>
      <button
        type="button"
        onClick={() => { createFriend(friend); }}
        disabled={isDisable}
      >
        Ok
      </button>
    </tr>
  );
}
