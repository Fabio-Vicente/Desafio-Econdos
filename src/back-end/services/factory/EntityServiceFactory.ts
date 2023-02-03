import type mongoose from 'mongoose';
import Error from '../../error';
import { type IRepository, type IEntityService, type IError } from '../../interfaces';

type ObjectId = mongoose.Types.ObjectId;

export default class EntityServiceFactory<T> implements IEntityService<T> {
  constructor(protected readonly _repository: IRepository<T>) {}

  async ReadAllInstances(): Promise<T[]> {
    return this._repository.GetAll();
  }

  async ReadOneInstance(id: string | ObjectId): Promise<T | IError> {
    const repositoryResponse = await this._repository.Get(id);

    if (repositoryResponse === null) {
      return new Error(Error.catalog.NOT_FOUND);
    }

    return repositoryResponse;
  }

  async CreateInstance(newInstance: T): Promise<T> {
    return this._repository.Create(newInstance);
  }

  async UpdateInstance(changedInstance: T): Promise<T | IError> {
    const repositoryResponse = await this._repository.Update(changedInstance);

    if (repositoryResponse === null) {
      return new Error(Error.catalog.NOT_FOUND);
    }

    return changedInstance;
  }

  async DeleteInstance(changedInstance: T): Promise<T | IError> {
    const repositoryResponse = await this._repository.Delete(changedInstance);

    if (repositoryResponse === null) {
      return new Error(Error.catalog.NOT_FOUND);
    }

    return changedInstance;
  }
}
