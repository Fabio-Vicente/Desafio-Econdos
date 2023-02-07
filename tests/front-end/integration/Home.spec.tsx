import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from 'desafio-econdos-frontend/src/pages';
import { createdFriend, newFriend } from '../../stubs/friendsMock';

describe('Verifica se na página principal', () => {
  let mockedFetch: jest.SpyInstance<Promise<Response>>;

  before(() => { mockedFetch = jest.spyOn(global, 'fetch').mockImplementation(); });

  afterEach(() => mockedFetch.mockClear());

  it('tem tabela para preenchimentos dos amigos', () => {
    render(<Home />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('tem um botão para sortear', () => {
    render(<Home />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('a tabela tem os campos corretos', () => {
    render(<Home />);

    const rows: HTMLElement[] = screen.getAllByRole('row');
    const headersLine: HTMLCollection = rows[0].children;
    const bodyLine: HTMLCollection = rows[1].children;
    const lineButton: Element = bodyLine[2];

    expect(rows).toHaveLength(2);
    expect(headersLine).toHaveLength(2);
    expect(bodyLine).toHaveLength(3);
    expect(headersLine[0]).toHaveTextContent('Nome');
    expect(headersLine[1]).toHaveTextContent('Email');
    expect(bodyLine[0]).not.toHaveValue();
    expect(bodyLine[1]).not.toHaveValue();
    expect(lineButton).toBeDisabled();
  });

  it('é possível adicionar um amigo na tabela', async () => {
    render(<Home />);

    const tableLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const lineButton: Element = tableLine[2];

    await userEvent.type(tableLine[0].firstElementChild as Element, 'Milena Almeida');
    expect(lineButton).toBeDisabled();
    await userEvent.type(tableLine[1].firstElementChild as Element, 'milaalmeidaaguiar02@gmail.com');

    expect(tableLine[0].firstElementChild).toHaveValue('Milena Almeida');
    expect(tableLine[1].firstElementChild).toHaveValue('milaalmeidaaguiar02@gmail.com');
    expect(lineButton).not.toBeDisabled();

    await userEvent.click(lineButton);
    const tableLines = screen.getAllByRole('row');
    const createdLine = tableLines[1].children;

    expect(tableLines).toHaveLength(3);
    expect(createdLine[0]).toHaveTextContent('Milena Almeida');
    expect(createdLine[1]).toHaveTextContent('milaalmeidaaguiar02@gmail.com');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith({
      body: JSON.stringify(newFriend),
      method: 'POST',
    });
  });

  it('é possível alterar um amigo da tabela', async () => {
    before(() => {
      mockedFetch.mockResolvedValueOnce(new Response(JSON.stringify(createdFriend)));
    });

    render(<Home />);

    const tableLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const insertButton: Element = tableLine[2];

    await userEvent.type(tableLine[0].firstElementChild as Element, 'Milena Almeida');
    await userEvent.type(tableLine[1].firstElementChild as Element, 'milaalmeidaaguiar02@gmail.com');
    await userEvent.click(insertButton);

    const newLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const updateButton: Element = newLine[2];
    expect(updateButton).toBeInTheDocument();

    await userEvent.click(updateButton);
    const editingLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const confirmButton: Element = editingLine[2];

    expect(updateButton).not.toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    await userEvent.clear(editingLine[0].firstElementChild as Element);
    await userEvent.clear(editingLine[0].firstElementChild as Element);
    await userEvent.type(editingLine[0].firstElementChild as Element, 'Fábio Vicente');
    await userEvent.type(editingLine[1].firstElementChild as Element, 'fab10_lima@hotmail.com');
    await userEvent.click(confirmButton);

    const updatedLine: HTMLCollection = screen.getAllByRole('row')[1].children;

    expect(editingLine[0]).not.toBeInTheDocument();
    expect(editingLine[1]).not.toBeInTheDocument();
    expect(confirmButton).not.toBeInTheDocument();
    expect(updatedLine[0]).toHaveTextContent('Milena Almeida');
    expect(updatedLine[1]).toHaveTextContent('milaalmeidaaguiar02@gmail.com');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith({
      body: JSON.stringify({ _id: createdFriend._id, name: 'Fábio Vicente', email: 'fab10_lima@hotmail.com' }),
      method: 'PUT',
    });
  });

  it('é possível remover um amigo da tabela', async () => {
    before(() => {
      mockedFetch.mockResolvedValueOnce(new Response(JSON.stringify(createdFriend)));
    });

    render(<Home />);

    const tableLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const insertButton: Element = tableLine[2];

    await userEvent.type(tableLine[0].firstElementChild as Element, 'Milena Almeida');
    await userEvent.type(tableLine[1].firstElementChild as Element, 'milaalmeidaaguiar02@gmail.com');
    await userEvent.click(insertButton);

    const newLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const deleteButton: Element = newLine[3];
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    const tableLines = screen.getAllByRole('row');

    expect(newLine[0]).not.toBeInTheDocument();
    expect(newLine[1]).not.toBeInTheDocument();
    expect(tableLines).toHaveLength(2);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith({
      body: JSON.stringify(createdFriend),
      method: 'DELETE',
    });
  });
});
