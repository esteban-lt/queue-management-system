import { Router } from 'express';

import { UserController } from '../controllers/user-controller';

import { PostgresUserDatasource } from '@users/infrastructure/datasources/postgres-user-datasource';
import { UserRepositoryImplementation } from '@users/infrastructure/repositories/user-repository-implementation';

import { 
  GetUsersUseCase, 
  GetUserByIdUseCase, 
  CreateUserUseCase, 
  UpdateUserUseCase, 
  UpdateUserRoleUseCase, 
  UpdateUserBranchUseCase, 
  ToggleUserUseCase 
} from '@users/application/use-cases';
import { AuthMiddleware } from '@auth/presentation/middlewares/auth-middleware';


export class UserRoutes {

  public static get controller() {
    const userDatasource = new PostgresUserDatasource();
    const userRepository = new UserRepositoryImplementation(userDatasource);

    const getUsersUseCase = new GetUsersUseCase(userRepository);
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const updateUserRoleUseCase = new UpdateUserRoleUseCase(userRepository);
    const updateUserBranchUseCase = new UpdateUserBranchUseCase(userRepository);
    const toggleUserUseCase = new ToggleUserUseCase(userRepository);

    const controller = new UserController(
      getUsersUseCase,
      getUserByIdUseCase,
      createUserUseCase,
      updateUserUseCase,
      updateUserRoleUseCase,
      updateUserBranchUseCase,
      toggleUserUseCase,
    );

    return controller;
  }

  public static get routes() {
    const router = Router();
    const userController = UserRoutes.controller;

    router.get('/', AuthMiddleware.verifyRole('admin', 'manager'), userController.getUsers);
    router.get('/:id', userController.getUserById);

    router.post('/', AuthMiddleware.verifyRole('admin', 'manager'), userController.createUser);
    
    router.patch('/:id', userController.updateUserById);
    router.patch('/:id/role', AuthMiddleware.verifyRole('admin', 'manager'), userController.updateUserRoleById);
    router.patch('/:id/branch', AuthMiddleware.verifyRole('admin', 'manager'), userController.updateUserBranchById);
    router.patch('/:id/toggle', AuthMiddleware.verifyRole('admin', 'manager'), userController.toggleUserById);

    return router;
  }
}
