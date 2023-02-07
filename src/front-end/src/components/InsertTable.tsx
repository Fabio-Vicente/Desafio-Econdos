import React, { useContext, type ReactElement } from 'react';
import friendContext from '../contexts/friendContext';
import InsertEntry from './InsertEntry';
import InsertLine from './InsertLine';

export default function InsertTable(): ReactElement {
  const { friends } = useContext(friendContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
          friends.map(({ name, email }, index) => (
            <InsertEntry
              key={email}
              name={name}
              email={email}
              index={index}
            />
          ))
          }
        <InsertLine />
      </tbody>
    </table>
  );
}
