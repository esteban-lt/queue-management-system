export type TicketStatus = 'waiting' | 'called' | 'attending' | 'completed' | 'skipped';

interface Options {
  id: string;
  branchId: string;
  serviceCategoryId: string;
  windowId?: string;
  attendedBy?: string;
  code: string;
  status: TicketStatus;
  calledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export class Ticket {

  public readonly id: string;
  public readonly branchId: string;
  public readonly serviceCategoryId: string;
  public readonly windowId?: string;
  public readonly attendedBy?: string;
  public readonly code: string;
  public readonly status: TicketStatus;
  public readonly calledAt?: Date;
  public readonly completedAt?: Date;
  public readonly createdAt: Date;

  constructor(options: Options) {
    this.id = options.id;
    this.branchId = options.branchId;
    this.serviceCategoryId = options.serviceCategoryId;
    this.windowId = options.windowId;
    this.attendedBy = options.attendedBy;
    this.code = options.code;
    this.status = options.status;
    this.calledAt = options.calledAt;
    this.completedAt = options.completedAt;
    this.createdAt = options.createdAt;
  }

  public call(windowId: string, attendedBy: string): Ticket {
    if(this.status !== 'waiting') throw new Error(`cannot call a ticket with status ${this.status}`);
    return new Ticket({ 
      ...this,
      windowId,
      attendedBy,
      status: 'called',
      calledAt: new Date(),
    });
  }

  public attend(): Ticket {
    if(this.status !== 'called') throw new Error(`cannot attend a ticket with status ${this.status}`);
    return new Ticket({
      ...this,
      status: 'attending',
    });
  }

  public complete(): Ticket {
    if(this.status !== 'attending') throw new Error(`cannot complete a ticket with status ${this.status}`);
    return new Ticket({
      ...this,
      status: 'completed',
      completedAt: new Date(),
    });
  }

  public skip(): Ticket {
    if(this.status !== 'called' && this.status !== 'attending') throw new Error(`cannot skip a ticket with status ${this.status}`);
    return new Ticket({
      ...this,
      status: 'skipped',
      completedAt: new Date(),
    });
  }
}
