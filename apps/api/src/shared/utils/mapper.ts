export class Mapper {
  public static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => result[key] = obj[key]);
    return result;
  }

  public static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => delete (result as any)[key]);
    return result;
  }
}
