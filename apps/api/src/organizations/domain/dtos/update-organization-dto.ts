export class UpdateOrganizationDto {

  private constructor(
    public readonly name: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, UpdateOrganizationDto?] {
    if(!object) return ['request body is required'];
    const { name } = object;
    if(!name) return ['name is required'];
    if(name.length < 3) return ['name must be at least 3 characters long'];
    
    return [
      undefined,
      new UpdateOrganizationDto(name)
    ];
  }
}
