import { Jwt, Password } from '@plugins/index';
import { ResponseError } from '@errors/response-error';

import type { OrganizationRepository } from '@organizations/domain/repositories/organization-repository';
import { CreateOrganizationDto } from '@organizations/domain/dtos/create-organization-dto';

import type { RegisterUserDto } from '../../domain/dtos/register-user-dto';
import type { AuthRepository } from '../../domain/repositories/auth-repository';
import type { AuthenticatedUser } from '../../domain/entities/authenticated-user';
import { UserMapper } from '../../domain/mappers/user-mapper';

export class RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  public async execute(registerUserDto: RegisterUserDto): Promise<AuthenticatedUser> {

    const emailExists = await this.authRepository.findUserByEmail(registerUserDto.email);
    if(emailExists) throw ResponseError.badRequest('email already exists');

    const [organizationError, createOrganizationDto] = CreateOrganizationDto.create({
      name: registerUserDto.organizationName,
      slug: registerUserDto.organizationName.toLocaleLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });

    if(organizationError) throw ResponseError.badRequest(organizationError);
    const organization = await this.organizationRepository.createOrganization(createOrganizationDto!)
    
    const hashedPassword = await Password.hash(registerUserDto.password);

    const user = await this.authRepository.createUser({
      ...registerUserDto,
      password: hashedPassword,
      organizationId: organization.id,
      role: 'admin',
    });

    const token = await Jwt.sign({ id: user.id });

    return {
      user: UserMapper.withoutPassword(user),
      token
    };
  }
}
