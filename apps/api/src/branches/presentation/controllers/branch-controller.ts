import type { Request, Response } from 'express';
import { ResponseError } from '@errors/response-error';

import { UpdateBranchDto } from '@branches/domain/dtos/update-branch-dto';
import { CreateBranchDto } from '@branches/domain/dtos/create-branch-dto';

import { 
  CreateBranchUseCase, 
  GetBrancByIdUseCase,  
  GetBranchesUseCase, 
  ToggleBranchByIdUseCase, 
  UpdateBranchByIdUseCase,
} from '@branches/application/use-cases';

export class BranchController {

  constructor(
    private readonly getBranchesUseCase: GetBranchesUseCase,
    private readonly getBranchByIdUseCase: GetBrancByIdUseCase,
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly updateBranchByIdUseCase: UpdateBranchByIdUseCase,
    private readonly toggleBranchByIdUseCase: ToggleBranchByIdUseCase,
  ) {}

  public getBranches = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const branches = await this.getBranchesUseCase.execute(organizationId);
    return res.status(200).json(branches);
  }

  public getBranchById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const branch = await this.getBranchByIdUseCase.execute(id);
    return res.status(200).json(branch);
  }

  public createBranch = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const [error, createBranchDto] = CreateBranchDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const createdBranch = await this.createBranchUseCase.execute(organizationId, createBranchDto!);
    return res.status(201).json(createdBranch);
  }

  public updateBranchById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateBranchDto] = UpdateBranchDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const updatedBranch = await this.updateBranchByIdUseCase.execute(id, updateBranchDto!);
    return res.status(200).json(updatedBranch);
  }

  public toggleBranchById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const branch = await this.toggleBranchByIdUseCase.execute(id);
    return res.status(200).json(branch);
  }
}
