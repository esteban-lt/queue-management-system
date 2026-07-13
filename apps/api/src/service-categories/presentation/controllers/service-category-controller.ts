import type { Request, Response } from 'express';
import { ResponseError } from '@errors/response-error';

import { 
  CreateServiceCategoryUseCase, 
  GetServiceCategoriesUseCase, 
  GetServiceCategoryByIdUseCaseUseCase, 
  ToggleServiceCategoryByIdUseCase, 
  UpdateServiceCategoryByIdUseCase 
} from '@service-categories/application/use-cases';

import { CreateServiceCategoryDto } from '@service-categories/domain/dtos/create-service-category-dto';
import { UpdateServiceCategoryDto } from '@service-categories/domain/dtos/update-service-category-dto';

export class ServiceCategoryController {

  constructor(
    private readonly getServiceCategoriesUseCase: GetServiceCategoriesUseCase,
    private readonly getServiceCategoryByIdUseCase: GetServiceCategoryByIdUseCaseUseCase,
    private readonly createServiceCategoryUseCase: CreateServiceCategoryUseCase,
    private readonly updateServiceCategoryByIdUseCase: UpdateServiceCategoryByIdUseCase,
    private readonly toggleServiceCategoryByIdUseCase: ToggleServiceCategoryByIdUseCase,
  ) {}

  public getServiceCategories = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const serviceCategories = await this.getServiceCategoriesUseCase.execute(organizationId);
    return res.status(200).json(serviceCategories);
  }

  public getServiceCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceCategory = await this.getServiceCategoryByIdUseCase.execute(id);
    return res.status(200).json(serviceCategory);
  }

  public createServiceCategory = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const [error, createServiceCategoryDto] = CreateServiceCategoryDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const serviceCategory = await this.createServiceCategoryUseCase.execute(organizationId, createServiceCategoryDto!);
    return res.status(201).json(serviceCategory);
  }

  public updateServiceCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateServiceCategoryDto] = UpdateServiceCategoryDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const serviceCategory = await this.updateServiceCategoryByIdUseCase.execute(id, updateServiceCategoryDto!);
    return res.status(200).json(serviceCategory);
  }

  public toggleServiceCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceCategory = await this.toggleServiceCategoryByIdUseCase.execute(id);
    return res.status(200).json(serviceCategory);
  }
}
