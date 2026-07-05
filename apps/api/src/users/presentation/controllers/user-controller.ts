import type { Request, Response } from 'express';
import { ResponseError } from '@errors/response-error';

import type { 
  CreateUserUseCase, 
  GetUserByIdUseCase, 
  GetUsersUseCase, 
  ToggleUserUseCase, 
  UpdateUserBranchUseCase, 
  UpdateUserRoleUseCase, 
  UpdateUserUseCase 
} from '@users/application/use-cases';

import { CreateUserDto } from '@users/domain/dtos/create-user-dto';
import { UpdateUserDto } from '@users/domain/dtos/update-user-dto';
import { UpdateUserRoleDto } from '@users/domain/dtos/update-user-role-dto';
import { UpdateUserBranchDto } from '@users/domain/dtos/update-user-branch-dto';

export class UserController {

  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCase,
    private readonly updateUserBranchUseCase: UpdateUserBranchUseCase,
    private readonly toggleUserUseCase: ToggleUserUseCase,
  ) {}

  public getUsers = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const users = await this.getUsersUseCase.execute(organizationId);
    return res.status(200).json(users);
  }

  public getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = await this.getUserByIdUseCase.execute(id);
    return res.status(200).json(user);
  }

  public createUser = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const createdUser = await this.createUserUseCase.execute(organizationId, createUserDto!);
    return res.status(201).json(createdUser);
  }

  public updateUserById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateUserDto] = UpdateUserDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const updatedUser = await this.updateUserUseCase.execute(id, updateUserDto!);
    return res.status(200).json(updatedUser);
  }

  public updateUserRoleById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateUserRoleDto] = UpdateUserRoleDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const updatedUser = await this.updateUserRoleUseCase.execute(id, updateUserRoleDto!);
    return res.status(200).json(updatedUser);
  }

  public updateUserBranchById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateUserBranchDto] = UpdateUserBranchDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const updatedUser = await this.updateUserBranchUseCase.execute(id, updateUserBranchDto!);
    return res.status(200).json(updatedUser);
  }

  public toggleUserById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const updatedUser = await this.toggleUserUseCase.execute(id);
    return res.status(200).json(updatedUser);
  }
}
