interface Options {
  id: string;
  organizationId: string;
  name: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
}

export class Branch {

  public readonly id: string;
  public readonly organizationId: string;
  public readonly name: string;
  public readonly address: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;

  constructor(options: Options) {
    this.id = options.id; 
    this.organizationId = options.organizationId; 
    this.name = options.name; 
    this.address = options.address; 
    this.isActive = options.isActive;
    this.createdAt = options.createdAt;
  }
}
