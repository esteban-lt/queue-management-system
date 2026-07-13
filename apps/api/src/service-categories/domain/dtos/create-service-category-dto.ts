import { Validators } from '@plugins/validators';

export class CreateServiceCategoryDto {

  private constructor(
    public readonly name: string,
    public readonly prefix: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateServiceCategoryDto?] {
    if(!object) return ['request body is required'];
    const { name, prefix } = object;

    if(!name) return ['name is required'];
    if(name.length > 127) return ['name cannot be longer than 127 characters'];
    if(!Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];

    if(!prefix) return ['prefix is required'];
    if(prefix.length > 2) return ['prefix cannot be longer than 2 characters'];
    if(!Validators.isPrefix(prefix)) return ['prefix can only contain letters and numbers'];

    return [
      undefined,
      new CreateServiceCategoryDto(name, prefix)
    ];
  }
}
