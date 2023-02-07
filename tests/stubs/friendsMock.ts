import type IFriend from 'desafio-econdos-backend/interfaces/core/';

export const searchId: string = '507f1f77bcf86cd799439011';

export const inexistentId: string = '507f1f77bcf86cd799439012';

export const malFormedId: string = '507f1f77bcf86cd79943901';

export const allFriends: IFriend[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Fábio Vicente',
    email: 'fab10_lima@hotmail.com',
    secretFriend: '507f191e810c19729de860ea',
  },
  {
    _id: '507f191e810c19729de860e',
    name: 'Ricardo Paiva',
    email: 'ricardos@econdos.com.br',
    secretFriend: '507f1f77bcf86cd799439011',
  },
];

export const oneFriend: IFriend = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Fábio Vicente',
  email: 'fab10_lima@hotmail.com',
  secretFriend: '507f191e810c19729de860ea',
};

export const newFriend: IFriend = {
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02@gmail.com',
};

export const newWrongEmailFriend: IFriend = {
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02gmail.com',
};

export const newWrongEmailFriend2: IFriend = {
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02@gmailcom',
};

export const newWrongTypeName = {
  name: 2,
  email: 'milaalmeidaaguiar02@gmailcom',
};

export const newWrongTypeEmail = {
  name: 'Milena Almeida',
  email: 2,
};

export const createdFriend: IFriend = {
  _id: '00000020f51bb4362eee2a4d',
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02@gmail.com',
  secretFriend: '',
};

export const wrongEmailFriend: IFriend = {
  _id: '00000020f51bb4362eee2a4d',
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02gmail.com',
};

export const wrongEmailFriend2: IFriend = {
  _id: '00000020f51bb4362eee2a4d',
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02@gmailcom',
};

export const wrongTypeName = {
  _id: '00000020f51bb4362eee2a4d',
  name: 2,
  email: 'milaalmeidaaguiar02@gmail.com',
};

export const wrongTypeEmail = {
  _id: '00000020f51bb4362eee2a4d',
  name: 'Milena Almeida',
  email: 2,
};

export const wrongSecretFriend: IFriend = {
  _id: '00000020f51bb4362eee2a4d',
  name: 'Milena Almeida',
  email: 'milaalmeidaaguiar02gmail.com',
  secretFriend: '507f1f77bcf86cd799439011',
};

export const updatedFriend: IFriend = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Fábio Vicente',
  email: 'fabiolvsantos93@gmail.com',
  secretFriend: '507f191e810c19729de860ea',
};

export const inexistentFriend: IFriend = {
  _id: inexistentId,
  name: 'Fábio Vicente',
  email: 'fabiolvsantos93@gmail.com',
  secretFriend: '507f191e810c19729de860ea',
};

export const updateResponse = { matchedCount: 1 };

export const notUpdateResponse = { matchedCount: 0 };

export const deleteResponse = { deletedCount: 1 };

export const notDeleteResponse = { deletedCount: 0 };
