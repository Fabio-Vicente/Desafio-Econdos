import React, { type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';

export default function FriendRouter(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
