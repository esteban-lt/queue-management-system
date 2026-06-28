import { Router } from 'express';

import { BranchController } from '../controllers/branch-controller';

import { PostgresBranchDatasource } from '@branches/infrastructure/datasources/postgres-branch-datasource';
import { BranchRepositoryImplementation } from '@branches/infrastructure/repositories/branch-repository-implementation';

import { 
  GetBranchesUseCase, 
  GetBrancByIdUseCase, 
  CreateBranchUseCase, 
  UpdateBranchByIdUseCase, 
  ToggleBranchByIdUseCase 
} from '@branches/application/use-cases';

export class BranchRoutes {

  public static get controller() {
    const branchDatasource = new PostgresBranchDatasource();
    const branchRepository = new BranchRepositoryImplementation(branchDatasource);

    const getBranchesUseCase = new GetBranchesUseCase(branchRepository);
    const getBranchByIdUseCase = new GetBrancByIdUseCase(branchRepository);
    const createBranchUseCase = new CreateBranchUseCase(branchRepository);
    const updateBranchByIdUseCase = new UpdateBranchByIdUseCase(branchRepository);
    const toggleBranchByIdUseCase = new ToggleBranchByIdUseCase(branchRepository);

    const controller = new BranchController(
      getBranchesUseCase,
      getBranchByIdUseCase,
      createBranchUseCase,
      updateBranchByIdUseCase,
      toggleBranchByIdUseCase,
    );

    return controller;
  }

  public static get routes() {
    const router = Router();
    const branchController = BranchRoutes.controller;

    router.get('/', branchController.getBranches);
    router.get('/:id', branchController.getBranchById);

    router.post('/', branchController.createBranch);

    router.patch('/:id', branchController.updateBranchById);
    router.patch('/:id/toggle', branchController.toggleBranchById);

    return router;
  }
}
