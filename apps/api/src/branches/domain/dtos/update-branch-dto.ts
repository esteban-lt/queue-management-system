export class UpdateBranchDto {
  
  private constructor(
    public name?: string,
    public address?: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, UpdateBranchDto?] {
    if(!object) return ['request body is required'];
    const { name, address } = object;
    if(!name && !address) return ['name or address is required'];
    if(name && name.length < 3) return ['name must be at least 3 characters long'];
    if(address && address.length < 12) return ['address is too short'];

    return [
      undefined,
      new UpdateBranchDto(name, address)
    ];
  }
}
