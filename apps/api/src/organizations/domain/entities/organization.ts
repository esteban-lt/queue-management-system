interface Options {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
}

export class Organization {
  
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;

  constructor(options: Options) {
    this.id = options.id;
    this.name = options.name;
    this.slug = options.slug;
    this.isActive = options.isActive;
    this.createdAt = options.createdAt;
  }
}
