export class Validators {

  static readonly #emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  static readonly #passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  static readonly #nameRegex = /^[a-zA-Z0-9 ]+$/;

  static isEmail(email: string): boolean {
    return this.#emailRegex.test(email);
  }

  static isStrongPassword(password: string): boolean {
    return this.#passwordRegex.test(password);
  }

  static isAlphanumeric(value: string): boolean {
    return this.#nameRegex.test(value);
  }
}
