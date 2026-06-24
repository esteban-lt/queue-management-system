import type { Role } from '../types/role';

export interface CreateUserData {
  organizationId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  branchId?: string;
}