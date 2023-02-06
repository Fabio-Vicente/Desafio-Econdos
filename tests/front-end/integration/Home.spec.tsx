import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from 'desafio-econdos-frontend/src/pages';

describe('Verifica se na página principal', () => {
  it('tem tabela para preenchimentos dos amigos', () => {
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

    await userEvent.type(tableLine[0].firstElementChild as Element, 'Fábio Vicente');
    expect(lineButton).toBeDisabled();
    await userEvent.type(tableLine[1].firstElementChild as Element, 'fab10_lima@hotmail.com');

    expect(tableLine[0].firstElementChild).toHaveValue('Fábio Vicente');
    expect(tableLine[1].firstElementChild).toHaveValue('fab10_lima@hotmail.com');
    expect(lineButton).not.toBeDisabled();

    await userEvent.click(lineButton);
    const tableLines = screen.getAllByRole('row');
    const createdLine = tableLines[1].children;

    expect(tableLines).toHaveLength(3);
    expect(createdLine[0]).toHaveTextContent('Fábio Vicente');
    expect(createdLine[1]).toHaveTextContent('fab10_lima@hotmail.com');
  });

  it('é possível alterar um amigo da tabela', async () => {
    render(<Home />);

    const tableLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const insertButton: Element = tableLine[2];

    await userEvent.type(tableLine[0].firstElementChild as Element, 'Fábio Vicente');
    await userEvent.type(tableLine[1].firstElementChild as Element, 'fab10_lima@hotmail.com');
    await userEvent.click(insertButton);

    const newLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const updateButton: Element = newLine[2];
    expect(updateButton).toBeInTheDocument();

    await userEvent.click(updateButton);
    const editingLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const confirmButton: Element = editingLine[2];

    expect(updateButton).not.toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    await userEvent.type(editingLine[0].firstElementChild as Element, 'Milena Almeida');
    await userEvent.type(editingLine[1].firstElementChild as Element, 'milaalmeidaaguiar02@gmail.com');
    await userEvent.click(confirmButton);

    const updatedLine: HTMLCollection = screen.getAllByRole('row')[1].children;

    expect(updatedLine[0]).toHaveTextContent('Milena Almeida');
    expect(updatedLine[1]).toHaveTextContent('milaalmeidaaguiar02@gmail.com');
  });

  it('é possível remover um amigo da tabela', async () => {
    render(<Home />);

    const tableLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const insertButton: Element = tableLine[2];

    await userEvent.type(tableLine[0].firstElementChild as Element, 'Fábio Vicente');
    await userEvent.type(tableLine[1].firstElementChild as Element, 'fab10_lima@hotmail.com');
    await userEvent.click(insertButton);

    const newLine: HTMLCollection = screen.getAllByRole('row')[1].children;
    const deleteButton: Element = newLine[3];
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    expect(newLine[0]).not.toBeInTheDocument();
    expect(newLine[1]).not.toBeInTheDocument();
  });
});
