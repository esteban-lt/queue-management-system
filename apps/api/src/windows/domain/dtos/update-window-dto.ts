import { Validators } from '@plugins/validators';

export class UpdateWindowDto {
  
  private constructor(
      public readonly serviceCategoryId?: string,
      public readonly name?: string,
    ) {}
  
    public static create(object: { [key: string]: any }): [string?, UpdateWindowDto?] {
  
      if(!object) return ['request body is required'];
  
      const { serviceCategoryId, name } = object;
  
      if(!serviceCategoryId && !name) return ['at least one field is required'];
      if(serviceCategoryId && typeof serviceCategoryId !== 'string') return ['service category id must be a string'];
      if(name && !Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];
  
      return [
        undefined,
        new UpdateWindowDto(serviceCategoryId, name)
      ];
    }
}