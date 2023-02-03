import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HTTPError, ErrorCatalog } from '../../error';
import { type IController, type IEntityService, type IValidateMiddleware } from '../../interfaces';

export default abstract class ControllerFactory<T> implements IController<T> {
  constructor(
    protected readonly _entityService: IEntityService<T>,
    protected readonly _validationMiddleware?: IValidateMiddleware<T>,
  ) {
    this.ReadAll = this.ReadAll.bind(this);
    this.ReadOne = this.ReadOne.bind(this);
    this.Create = this.Create.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
  }

  async ReadAll(_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json(await this._entityService.ReadAllInstances());
  }

  async ReadOne(req: Request, res: Response<T>, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const readResponse = await this._entityService.ReadOneInstance(id);

    if ((readResponse as ErrorCatalog) === ErrorCatalog.NOT_FOUND) {
      next(new HTTPError(StatusCodes.NOT_FOUND, readResponse as ErrorCatalog));
      return;
    }

    res.status(StatusCodes.OK).json(readResponse as T);
  }

  async Create(req: Request<T>, res: Response<T>): Promise<void> {
    res.status(StatusCodes.CREATED).json(await this._entityService.CreateInstance(req.body));
  }

  async Update(req: Request<T>, res: Response<T>, next: NextFunction): Promise<void> {
    const updateResponse = await this._entityService.UpdateInstance(req.body);

    if ((updateResponse as ErrorCatalog) === ErrorCatalog.NOT_FOUND) {
      next(new HTTPError(StatusCodes.NOT_FOUND, updateResponse as ErrorCatalog));
      return;
    }

    res.status(StatusCodes.OK).json(updateResponse as T);
  }

  async Delete(req: Request<T>, res: Response<T>, next: NextFunction): Promise<void> {
    const deletResponse = await this._entityService.DeleteInstance(req.body);

    if ((deletResponse as ErrorCatalog) === ErrorCatalog.NOT_FOUND) {
      next(new HTTPError(StatusCodes.NOT_FOUND, deletResponse as ErrorCatalog));
      return;
    }

    res.status(StatusCodes.OK).json(deletResponse as T);
  }
}
