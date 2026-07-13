interface Options {
  id: string;
  organizationId: string;
  name: string;
  prefix: string;
  avgAttentionMinutes?: number;
  isActive: boolean;
  createdAt: Date;
}

export class ServiceCategory {

  public readonly id: string;
  public readonly organizationId: string;
  public readonly name: string;
  public readonly prefix: string;
  public readonly avgAttentionMinutes?: number;
  public readonly isActive: boolean;
  public readonly createdAt: Date;

  constructor(options: Options) {
    this.id = options.id;
    this.organizationId = options.organizationId;
    this.name = options.name;
    this.prefix = options.prefix;
    this.avgAttentionMinutes = options.avgAttentionMinutes;
    this.isActive = options.isActive;
    this.createdAt = options.createdAt;
  }
}
