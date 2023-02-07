import { StatusCodes } from 'http-status-codes';
import { type IFriend } from '../contracts/core';

const baseURL = process.env.REACT_APP_BACKEND_URL as string;

const requestAPI = async (
  method: string = 'GET',
  body: string | IFriend | null = null,
  route: string = '',
): Promise<Response> => (
  fetch(`${baseURL}/${route}`, { method, body: JSON.stringify(body) })
    .then((response) => response)
);

export const requestFriends = async (): Promise<IFriend[]> => {
  const response = await requestAPI();

  if (response.status !== StatusCodes.OK) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const createFriend = async (friend: IFriend): Promise<IFriend> => {
  const response = await requestAPI('POST', friend);

  if (response.status !== StatusCodes.CREATED) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const deleteFriend = async (friend: IFriend): Promise<IFriend> => {
  const response = await requestAPI('DELETE', friend);

  if (response.status !== StatusCodes.OK) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const updateFriend = async (id: string, friend: IFriend): Promise<IFriend> => {
  const response = await requestAPI('PUT', friend, id);

  if (response.status !== StatusCodes.OK) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const deleteAllFriends = async (): Promise<void> => {
  const response = await requestAPI('DELETE', null, '/all');

  if (response.status !== StatusCodes.NO_CONTENT) {
    throw new Error(response.statusText);
  }

  return response.json();
};
