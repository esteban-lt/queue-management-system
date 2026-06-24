import type { User } from './user';

interface Options {
  user: Omit<User, 'password'>;
  token: string;
}

export class AuthenticatedUser {
  public readonly user: Omit<User, 'password'>;
  public readonly token: string;

  constructor(options: Options) {
    this.user = options.user;
    this.token = options.token;
  }
}
