export class CreateBranchDto {

  private constructor(
    public name: string,
    public address: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateBranchDto?] {
    if(!object) return ['request body is required'];
    const { name, address } = object;
    if(!name) return ['name is required'];
    if(!address) return ['address is required'];
    if(name.length < 3) return ['name must be at least 3 characters long'];
    if(address.length < 12) return ['address is too short'];

    return [
      undefined,
      new CreateBranchDto(name, address)
    ];
  }
}
