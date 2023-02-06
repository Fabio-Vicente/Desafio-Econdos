import React, { type ReactElement } from 'react';

export default function InsertTable(): ReactElement {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody />
    </table>
  );
}
