/* eslint-disable @typescript-eslint/no-misused-promises */
import 'mocha';
import 'chai-http';
import { expect } from 'chai';
import { type SinonStub, stub } from 'sinon';
import { type Response } from 'superagent';
import { type DeleteResult } from 'mongodb';
import { Model, type UpdateWriteOpResult } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import App from 'desafio-econdos-backend/app';
import {
  allFriends,
  createdFriend,
  deleteResponse,
  inexistentFriend,
  inexistentId,
  newFriend,
  notDeleteResponse,
  oneFriend,
  searchId,
  updatedFriend,
  updateResponse,
} from '../stubs/friends';

const { app } = new App();

describe('Verifica se a aplicação responde como esperado quando:', () => {
  let response: Response;

  context('É requisitado a leitura da lista de amigos (ReadAll)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'find').resolves(allFriends);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).get('/friends');

    it('com o status code 200 - OK:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com a lista correta no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(allFriends);
    });
  });

  context('É requisitado a leitura de um único amigo (ReadOne)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'findOne').resolves(oneFriend);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).get(`/friends/${searchId}`);

    it('com o status code 200 - OK:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com o amigo correto no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(oneFriend);
    });
  });

  context('É requisitado a leitura de um único inexistente (ReadOne)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'findOne').resolves(null);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).get(`/friends/${inexistentId}`);

    it('com o status code 404 - NOT FOUND:', () => {
      expect(response.body).to.be.deep.equal(oneFriend);
    });
  });

  context('É requisitado a criação de um amigo (Create)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'create').resolves(createdFriend);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).post('/friends').send(newFriend);

    it('com o status code 201 - CREATED:', () => {
      expect(response.status).to.be.equal(StatusCodes.CREATED);
    });

    it('com o amigo criado no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(createdFriend);
    });
  });

  context('É requisitado a atualização de um amigo (Update)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'updateOne').resolves(updateResponse as UpdateWriteOpResult);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).put('/friends').send(updatedFriend);

    it('com o status code 200 - CREATED:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com o amigo atualizado no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(updatedFriend);
    });
  });

  context('É requisitado a atualização de um amigo (Update)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'updateOne').resolves(updateResponse as UpdateWriteOpResult);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).put('/friends').send(inexistentFriend);

    it('com o status code 404 - NOT FOUND:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });
  });

  context('É requisitado a remoção de um amigo (Delete)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'deleteOne').resolves(deleteResponse as DeleteResult);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).delete('/friends').send(oneFriend);

    it('com o status code 204 - NO CONTENT:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com o amigo removido no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(updatedFriend);
    });
  });

  context('É requisitado a remoção de um amigo inexistente (Delete)', async () => {
    let getStub: SinonStub;

    before(() => {
      getStub = stub(Model, 'deleteOne').resolves(notDeleteResponse as DeleteResult);
    });

    after(() => {
      getStub.restore();
    });

    response = await chai.request(app).delete('/friends').send(inexistentFriend);

    it('com o status code 404 - NOT FOUND:', () => {
      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND/*  */);
    });
  });
});
