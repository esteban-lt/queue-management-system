export class CreateTicketDto {
  
  private constructor(
    public readonly serviceCategoryId: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateTicketDto?] {
    if(!object) return ['request body is required'];
    const { serviceCategoryId } = object;

    if(!serviceCategoryId) return ['service category id is required'];
    if(typeof serviceCategoryId !== 'string') return ['service category id must be a string'];

    return [
      undefined,
      new CreateTicketDto(serviceCategoryId)
    ];
  }
}
