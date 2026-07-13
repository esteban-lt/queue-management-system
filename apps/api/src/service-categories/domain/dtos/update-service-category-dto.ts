import { Validators } from '@plugins/validators';

export class UpdateServiceCategoryDto {

  private constructor(
    public readonly name?: string,
    public readonly prefix?: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, UpdateServiceCategoryDto?] {
    if(!object) return ['request body is required'];
    const { name, prefix } = object;

    if(!name && !prefix) return ['at least name or prefix is required'];

    if(name && name.length > 127) return ['name cannot be longer than 127 characters'];
    if(name && !Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];

    if(prefix && prefix.length > 2) return ['prefix cannot be longer than 2 characters'];
    if(prefix && !Validators.isPrefix(prefix)) return ['prefix can only contain letters and numbers'];

    return [
      undefined,
      new UpdateServiceCategoryDto(name, prefix)
    ];
  }
}
