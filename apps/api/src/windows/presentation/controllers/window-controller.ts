import type { Request, Response } from 'express';

import type { 
  CreateWindowUseCase, 
  GetWindowByIdUseCase, 
  GetWindowsUseCase, 
  UpdateWindowByIdUseCase 
} from '@windows/application/use-cases';

import { CreateWindowDto } from '@windows/domain/dtos/create-window-dto';
import { UpdateWindowDto } from '@windows/domain/dtos/update-window-dto';

export class WindowController {

  constructor(
    private readonly getWindowsUseCase: GetWindowsUseCase,
    private readonly getWindowByIdUseCase: GetWindowByIdUseCase,
    private readonly createWindowUseCase: CreateWindowUseCase,
    private readonly updateWindowByIdUseCase: UpdateWindowByIdUseCase,
  ) {}

  public getWindows = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const windows = this.getWindowsUseCase.execute(organizationId);
    return res.status(200).json(windows);
  }

  public getWindowById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const window = this.getWindowByIdUseCase.execute(id);
    return res.status(200).json(window);
  }

  public createWindow = async (req: Request, res: Response) => {
    const [error, createWindowDto] = CreateWindowDto.create(req.body);
    if(error) return res.status(400).json({ error });
    const createdWindow = this.createWindowUseCase.execute(createWindowDto!);
    return res.status(201).json(createdWindow);
  }

  public updateWindowById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateWindowDto] = UpdateWindowDto.create(req.body);
    if(error) return res.status(400).json({ error });
    const updatedWindow = this.updateWindowByIdUseCase.execute(id, updateWindowDto!);
    return res.status(200).json(updatedWindow);
  }
}
