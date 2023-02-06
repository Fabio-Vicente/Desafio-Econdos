import React, { type ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import FriendRouter from './routes/FriendRoutes';

export default function Router(): ReactElement {
  return (
    <BrowserRouter>
      <FriendRouter />
    </BrowserRouter>
  );
}
