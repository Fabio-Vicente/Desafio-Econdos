import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from 'desafio-econdos-frontend/src/pages';

describe('Verifica se na página principal', () => {
  it('tem tabela para preenchimentos dos amigos', () => {
    render(<Home />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
