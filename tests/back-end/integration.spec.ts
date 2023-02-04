/* eslint-disable @typescript-eslint/no-misused-promises */
import 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
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
  malFormedId,
  newFriend,
  newWrongTypeEmail,
  newWrongTypeName,
  newWrongEmailFriend,
  newWrongEmailFriend2,
  notDeleteResponse,
  notUpdateResponse,
  oneFriend,
  searchId,
  updatedFriend,
  updateResponse,
  wrongEmailFriend,
  wrongEmailFriend2,
  wrongSecretFriend,
  wrongTypeEmail,
  wrongTypeName,
} from '../stubs/friendsMock';

const { app } = new App();

chai.use(chaiHttp);

describe('Verifica se a aplicação responde como esperado quando:', () => {
  let response: Response;

  context('É requisitado a leitura da lista de amigos (ReadAll)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'find').resolves(allFriends);
      response = await chai.request(app).get('/friends');
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 200 - OK:', async () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com a lista correta no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(allFriends);
    });
  });

  context('É requisitado a leitura de um único amigo (ReadOne)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'findOne').resolves(oneFriend);
      response = await chai.request(app).get(`/friends/${searchId}`);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 200 - OK:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com o amigo correto no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(oneFriend);
    });
  });

  context('É requisitado a leitura de um amigo inexistente (ReadOne)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'findOne').resolves(null);
      response = await chai.request(app).get(`/friends/${inexistentId}`);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 404 - NOT FOUND:', () => {
      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    });
  });

  context('É requisitado a leitura de um amigo com id mal-formatado (ReadOne)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'findOne').resolves(null);
      response = await chai.request(app).get(`/friends/${malFormedId}`);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 400 - NOT FOUND:', () => {
      expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });
  });

  context('É requisitado a criação de um amigo (Create)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'create').resolves(createdFriend);
      response = await chai.request(app).post('/friends').send(newFriend);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 201 - CREATED:', () => {
      expect(response.status).to.be.equal(StatusCodes.CREATED);
    });

    it('com o amigo criado no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(createdFriend);
    });
  });

  context('É requisitado a criação de um amigo com campos incorretos(Create)', () => {
    const wrongResponses: Response[] = [];

    before(async () => {
      [
        newWrongEmailFriend,
        newWrongEmailFriend2,
        newWrongTypeName,
        newWrongTypeEmail,
      ].forEach(async (wrongFriend) => {
        wrongResponses.push(await chai.request(app).post('/friends').send(wrongFriend));
      });
    });

    it('com o status code 400 - BAD REQUEST:', () => {
      wrongResponses.forEach((wrongResponse) => {
        expect(wrongResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
      });
    });
  });

  context('É requisitado a atualização de um amigo (Update)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'updateOne').resolves(updateResponse as UpdateWriteOpResult);
      response = await chai.request(app).put('/friends').send(updatedFriend);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 200 - OK:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com o amigo atualizado no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(updatedFriend);
    });
  });

  context('É requisitado a atualização de um amigo inexistente (Update)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'updateOne').resolves(notUpdateResponse as UpdateWriteOpResult);
      response = await chai.request(app).put('/friends').send(inexistentFriend);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 404 - NOT FOUND:', () => {
      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    });
  });

  context('É requisitado a atualização de um amigo com campos incorretos(Update)', () => {
    const wrongResponses: Response[] = [];

    before(async () => {
      [
        wrongEmailFriend,
        wrongEmailFriend2,
        wrongTypeName,
        wrongTypeEmail,
        wrongSecretFriend,
      ].forEach(async (wrongFriend) => {
        wrongResponses.push(await chai.request(app).put('/friends').send(wrongFriend));
      });
    });

    it('com o status code 400 - BAD REQUEST:', () => {
      wrongResponses.forEach((wrongResponse) => {
        expect(wrongResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
      });
    });
  });

  context('É requisitado a remoção de um amigo (Delete)', async () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'deleteOne').resolves(deleteResponse as DeleteResult);
      response = await chai.request(app).delete('/friends').send(oneFriend);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 200 - OK:', () => {
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('com o amigo removido no corpo da mensagem:', () => {
      expect(response.body).to.be.deep.equal(oneFriend);
    });
  });

  context('É requisitado a remoção de um amigo inexistente (Delete)', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'deleteOne').resolves(notDeleteResponse as DeleteResult);
      response = await chai.request(app).delete('/friends').send(inexistentFriend);
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 404 - NOT FOUND:', () => {
      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    });
  });

  context('É requisitado a atualização de um amigo com campos incorretos(Delete)', () => {
    const wrongResponses: Response[] = [];

    before(async () => {
      [
        wrongEmailFriend,
        wrongEmailFriend2,
        wrongTypeName,
        wrongTypeEmail,
        wrongSecretFriend,
      ].forEach(async (wrongFriend) => {
        wrongResponses.push(await chai.request(app).delete('/friends').send(wrongFriend));
      });
    });

    it('com o status code 400 - BAD REQUEST:', () => {
      wrongResponses.forEach((wrongResponse) => {
        expect(wrongResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
      });
    });
  });

  context('É requisitado a remoção de todos os amigos dados do banco', () => {
    let getStub: SinonStub;

    before(async () => {
      getStub = stub(Model, 'deleteMany');
      response = await chai.request(app).delete('/friends/all');
    });

    after(() => {
      getStub.restore();
    });

    it('com o status code 204 - NO CONTENT:', () => {
      expect(response.status).to.be.equal(StatusCodes.NO_CONTENT);
    });
  });
});
