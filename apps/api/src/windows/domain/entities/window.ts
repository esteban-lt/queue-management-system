interface Options {
  id: string;
  branchId: string;
  serviceCategoryId: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

export class Window {

  public readonly id: string;
  public readonly branchId: string;
  public readonly serviceCategoryId: string;
  public readonly name: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;

  constructor(options: Options) {
    this.id = options.id;
    this.branchId = options.branchId;
    this.serviceCategoryId = options.serviceCategoryId;
    this.name = options.name;
    this.isActive = options.isActive;
    this.createdAt = options.createdAt;
  }
}
