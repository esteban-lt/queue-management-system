import type { Request, Response } from 'express';

import { GetOrganizationByIdUseCase } from '@organizations/application/use-cases/get-organization-by-id-use-case';
import { GetOrganizationsUseCase } from '@organizations/application/use-cases/get-organizations-use-case';
import { UpdateOrganizationByIdUseCase } from '@organizations/application/use-cases/update-organization-by-id-use-case';
import { UpdateOrganizationDto } from '@organizations/domain/dtos/update-organization-dto';
import { ResponseError } from '@errors/response-error';

export class OrganizationController {

  constructor(
    private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    private readonly getOrganizationByIdUseCase: GetOrganizationByIdUseCase,
    private readonly updateOrganizationByIdUseCase: UpdateOrganizationByIdUseCase,
  ) {}

  public getOrganizations = async (req: Request, res: Response) => {
    const id = req.user?.organizationId as string;
    const organizations = await this.getOrganizationsUseCase.execute(id);
    return res.status(200).json(organizations);
  }

  public getOrganizationById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const organization = await this.getOrganizationByIdUseCase.execute(id);
    return res.status(200).json(organization);
  }

  public updateOrganizationById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const [error, updateOrganizationDto] = UpdateOrganizationDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const updatedOrganization = await this.updateOrganizationByIdUseCase.execute(id, updateOrganizationDto!);
    return res.status(200).json(updatedOrganization);
  }
}
