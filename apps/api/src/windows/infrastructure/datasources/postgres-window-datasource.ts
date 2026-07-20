import { ResponseError } from '@errors/response-error';
import { prisma } from '@lib/prisma';
import type { WindowDatasource } from '@windows/domain/datasources/window-datasource';
import type { CreateWindowDto } from '@windows/domain/dtos/create-window-dto';
import type { UpdateWindowDto } from '@windows/domain/dtos/update-window-dto';
import type { Window } from '@windows/domain/entities/window';
import { WindowMapper } from '@windows/domain/mappers/window-mapper';

export class PostgresWindowDatasource implements WindowDatasource {

  public async findAll(organizationId: string): Promise<Window[]> {
    const windows = await prisma.window.findMany();
    return windows.map(WindowMapper.fromObject);
  }

  public async findByBranchId(branchId: string): Promise<Window[]> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<Window | null> {
    const window = await prisma.window.findUnique({ where: { id } });
    if(!window) throw ResponseError.notFound('window not found');
    return WindowMapper.fromObject(window);
  }

  public async findByServiceCategoryId(serviceCategoryId: string): Promise<Window[]> {
    throw new Error('Method not implemented.');
  }

  public async save(dto: CreateWindowDto): Promise<Window> {
    const { branchId, serviceCategoryId, name } = dto;
    const window = await prisma.window.create({
      data: {
        branchId,
        serviceCategoryId,
        name,
      },
    });
    return WindowMapper.fromObject(window);
  }

  public async updateById(id: string, dto: UpdateWindowDto): Promise<Window> {
    const windowExists = await prisma.window.findUnique({ where: { id } });
    if(!windowExists) throw ResponseError.notFound('window not found');

    const { serviceCategoryId, name } = dto;

    const updatedWindow = await prisma.window.update({
      where: {
        id,
      },
      data: {
        serviceCategoryId,
        name,
      },
    });

    return WindowMapper.fromObject(updatedWindow);
  }

  public async toggleById(id: string): Promise<Window> {
    const window = await prisma.window.findUnique({ where: { id } });
    if(!window) throw ResponseError.notFound('window not found');

    const updatedWindow = await prisma.window.update({
      where: {
        id,
      },
      data: {
        isActive: !window.isActive,
      },
    });

    return WindowMapper.fromObject(updatedWindow);
  }
}