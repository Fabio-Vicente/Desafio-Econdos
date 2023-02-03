import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Error from '../../error';
import { type IError, type IController, type IEntityService } from '../../interfaces';

export default abstract class ControllerFactory<T> implements IController<T> {
  constructor(protected readonly _entityService: IEntityService<T>) {}

  async ReadAll(_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json(await this._entityService.ReadAllInstances());
  }

  async ReadOne(req: Request, res: Response<T>, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const readResponse = await this._entityService.ReadOneInstance(id);

    if ((readResponse as IError).code === Error.catalog.NOT_FOUND) {
      next(StatusCodes.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(readResponse as T);
  }

  async Create(req: Request<T>, res: Response<T>): Promise<void> {
    res.status(StatusCodes.CREATED).json(await this._entityService.CreateInstance(req.body));
  }

  async Update(req: Request<T>, res: Response<T>, next: NextFunction): Promise<void> {
    const updateResponse = await this._entityService.UpdateInstance(req.body);

    if ((updateResponse as IError).code === Error.catalog.NOT_FOUND) {
      next(StatusCodes.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(updateResponse as T);
  }

  async Delete(req: Request<T>, res: Response<T>, next: NextFunction): Promise<void> {
    const deletResponse = await this._entityService.DeleteInstance(req.body);

    if ((deletResponse as IError).code === Error.catalog.NOT_FOUND) {
      next(StatusCodes.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(deletResponse as T);
  }
}
