import type { Request, Response } from 'express';

import { LoginUseCase, RegisterUseCase } from '@auth/application/use-cases';

import { RegisterUserDto } from '@auth/domain/dtos/register-user-dto';
import { LoginDto } from '@auth/domain/dtos/login-dto';

export class AuthController {

  constructor (
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUseCase,
  ) {}

  public me = async (req: Request, res: Response) => {
    return res.status(200).json(req.user);
  }

  public login = async (req: Request, res: Response) => {
    const [error, loginDto] = LoginDto.create(req.body);
    if(error) return res.status(400).json({ error });
    const result = await this.loginUseCase.execute(loginDto!);
    return res.status(200).json(result);
  }

  public register = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if(error) return res.status(400).json({ error });
    const result = await this.registerUserUseCase.execute(registerUserDto!);
    return res.status(201).json(result);
  }
}
