import { Jwt, Password } from '@plugins/index';
import { ResponseError } from '@errors/response-error';
import { slugify } from '@utils/slugify';

import { CreateOrganizationDto } from '@organizations/domain/dtos/create-organization-dto';
import type { OrganizationRepository } from '@organizations/domain/repositories/organization-repository';

import { UserMapper } from '@auth/domain/mappers/user-mapper';
import type { AuthenticatedUser } from '@auth/domain/entities/authenticated-user';
import type { AuthRepository } from '@auth/domain/repositories/auth-repository';
import type { RegisterUserDto } from '@auth/domain/dtos/register-user-dto';

export class RegisterUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  public async execute(registerUserDto: RegisterUserDto): Promise<AuthenticatedUser> {

    const emailExists = await this.authRepository.findUserByEmail(registerUserDto.email);
    if(emailExists) throw ResponseError.badRequest('email already exists');

    const [organizationError, createOrganizationDto] = CreateOrganizationDto.create({
      name: registerUserDto.organizationName,
      slug: slugify(registerUserDto.name),
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
