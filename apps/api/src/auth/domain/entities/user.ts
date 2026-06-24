import type { Role } from '../types/role';

interface Options {
  id: string;
  organizationId: string;
  branchId?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}

export class User {

  public readonly id: string;
  public readonly organizationId: string;
  public readonly branchId?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly role: Role;
  public readonly isActive: boolean;
  public readonly createdAt: Date;

  constructor(options: Options) {
    this.id = options.id;
    this.organizationId = options.organizationId;
    this.branchId = options.branchId;
    this.name = options.name;
    this.email = options.email;
    this.password = options.password;
    this.role = options.role;
    this.isActive = options.isActive;
    this.createdAt = options.createdAt;
  }
}
