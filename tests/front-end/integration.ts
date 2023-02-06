import { render, screen } from '@testing-library/react';
import { Home } from '../../src/front-end/pages';

describe('Verifica se na página principal', () => {
  it('tem tabela para preenchimentos dos amigos', () => {
    render(Home);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
