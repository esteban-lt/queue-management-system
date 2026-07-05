export class UpdateUserBranchDto {

  private constructor(
    public readonly branchId: string,
  ) { }

  public static create(object: { [key: string]: any }): [string?, UpdateUserBranchDto?] {
    if(!object) return ['request body is required'];
    const { branchId } = object;

    if(!branchId) return ['branchId is required'];
    if(typeof branchId !== 'string') return ['branchId must be a string'];

    return [
      undefined,
      new UpdateUserBranchDto(branchId)
    ];
  }
}
