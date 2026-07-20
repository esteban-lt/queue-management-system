import { Validators } from '@plugins/validators';

export class CreateWindowDto {
  
  private constructor(
    public readonly branchId: string,
    public readonly serviceCategoryId: string,
    public readonly name: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateWindowDto?] {

    if(!object) return ['request body is required'];

    const { branchId, serviceCategoryId, name } = object;

    if(!branchId) return ['branch id is required'];
    if(typeof branchId !== 'string') return ['branch id must be a string'];
    if(!serviceCategoryId) return ['service category id is required'];
    if(typeof serviceCategoryId !== 'string') return ['service category id must be a string'];
    if(!name) return ['name is required'];
    if(!Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];

    return [
      undefined,
      new CreateWindowDto(branchId, serviceCategoryId, name)
    ];
  }
}
