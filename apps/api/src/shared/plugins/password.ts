export class Password {

  public static async hash(password: string): Promise<string> {
    return Bun.password.hash(password);
  }

  public static async compare(password: string, hash: string): Promise<boolean> {
    return Bun.password.verify(password, hash);
  }
}
