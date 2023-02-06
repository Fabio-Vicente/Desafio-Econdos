import React, { type ReactElement } from 'react';
import InsertTable from '../components/InsertTable';
import FriendProvider from '../contexts/friendContext/Provider';

export default function Home(): ReactElement {
  return (
    <FriendProvider>
      <InsertTable />
    </FriendProvider>
  );
}
