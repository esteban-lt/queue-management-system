import { get } from 'env-var';

export const env = {
  port: get('PORT').required().asPortNumber(),
  databaseUrl: get('DATABASE_URL').required().asString(),
}
