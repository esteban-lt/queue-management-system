export class CreateOrganizationDto {

  private constructor(
    public readonly name: string,
    public readonly slug: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateOrganizationDto?] {
    if(!object) return ['request body is required'];
    const { name, slug } = object;

    if(!name) return ['name is required'];
    if(!slug) return ['slug is required'];
    if(name.length < 3) return ['name must be at least 3 characters long'];

    return [
      undefined,
      new CreateOrganizationDto(name, slug)
    ];
  }
}
