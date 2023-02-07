import React, { type ReactNode } from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, type MemoryHistory } from 'history';

const renderWithRouter = (component: ReactNode): RenderResult & { history: MemoryHistory } => {
  const history = createMemoryHistory();
  const renderedComponent = render(
    <Router navigator={history} location="/">{ component }</Router>,
  );

  return {
    ...renderedComponent,
    history,
  };
};

export default renderWithRouter;
