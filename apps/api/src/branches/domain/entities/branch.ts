interface Options {
  id: string;
  organizationId: string;
  name: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
}

export class Branch {

  public id: string;
  public organizationId: string;
  public name: string;
  public address: string;
  public isActive: boolean;
  public createdAt: Date;

  constructor(options: Options) {
    this.id = options.id; 
    this.organizationId = options.organizationId; 
    this.name = options.name; 
    this.address = options.address; 
    this.isActive = options.isActive;
    this.createdAt = options.createdAt;
  }
}
