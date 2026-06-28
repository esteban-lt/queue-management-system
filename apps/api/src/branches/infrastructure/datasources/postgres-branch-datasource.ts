import { prisma } from '@lib/prisma';
import { ResponseError } from '@errors/response-error';

import { Branch } from '@branches/domain/entities/branch';
import { BranchDatasource } from '@branches/domain/datasources/branch-datasource';
import { BranchMapper } from '@branches/domain/mappers/branch-mapper';
import { CreateBranchDto } from '@branches/domain/dtos/create-branch-dto';
import { UpdateBranchDto } from '@branches/domain/dtos/update-branch-dto';

export class PostgresBranchDatasource implements BranchDatasource {

  public async getBranches(organizationId: string): Promise<Branch[]> {
    const branches = await prisma.branch.findMany({
      where: {
        organizationId,
      },
    });
    return branches.map(BranchMapper.fromObject);
  }

  public async getBranchById(id: string): Promise<Branch> {
    const branch = await prisma.branch.findUnique({
      where: {
        id,
      },
    });
    if(!branch) throw ResponseError.notFound('branch not found');
    return BranchMapper.fromObject(branch);
  }

  public async createBranch(organizationId: string, createBranchDto: CreateBranchDto): Promise<Branch> {
    const createdBranch = await prisma.branch.create({
      data: {
        organizationId,
        name: createBranchDto.name,
        address: createBranchDto.address,
      },
    });
    return BranchMapper.fromObject(createdBranch);
  }

  public async updateBranchById(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await prisma.branch.findUnique({ where: { id } });
    if(!branch) throw ResponseError.notFound('branch not found');
    const updatedBranch = await prisma.branch.update({
      where: {
        id,
      },
      data: {
        name: updateBranchDto.name,
        address: updateBranchDto.address,
      },
    });

    return BranchMapper.fromObject(updatedBranch);
  }

  public async toggleBranchById(id: string): Promise<Branch> {
    const branch = await prisma.branch.findUnique({ where: { id } });
    if(!branch) throw ResponseError.notFound('branch not found');
    const updatedBranch = await prisma.branch.update({
      where: { 
        id,
      },
      data: {
        isActive: !branch.isActive,
      },
    });
    
    return BranchMapper.fromObject(updatedBranch);
  }
}
