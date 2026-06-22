import { SignJWT, jwtVerify } from 'jose';
import { env } from './env';

const jwtSecret = new TextEncoder().encode(env.jwtSecret);

export class Jwt {

  public static async sign(payload: Record<string, unknown>, expiresIn: string = '12h'): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(jwtSecret);
  }

  public static async verify<T>(token: string): Promise<T | null> {
    try {
      const { payload } = await jwtVerify(token, jwtSecret);
      return payload as T;
    } catch {
      return null;
    }
  }
}
