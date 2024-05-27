import Ticket from "../../../domain/model/ticket/Ticket";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";

export default class InMemoryTicketRepository implements TicketRepositoryPort {
  private queue: Ticket[];

  constructor() {
    this.queue = [];
  }

  public addTicket(ticket: Ticket): void {
    if (this.queue.length === 0) {
      this.queue.push(ticket);
    } else {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        const currentCustomer = this.queue[i].getAppointment().getCustomer();
        const newCustomer = ticket.getAppointment().getCustomer();

        if (
          newCustomer.isOldPersonCustomer() &&
          !currentCustomer.isOldPersonCustomer()
        ) {
          this.queue.splice(i, 0, ticket);
          added = true;
          break;
        }

        if (
          newCustomer.isVipCustomer() &&
          !newCustomer.isOldPersonCustomer() &&
          !currentCustomer.isVipCustomer() &&
          !currentCustomer.isOldPersonCustomer()
        ) {
          this.queue.splice(i, 0, ticket);
          added = true;
          break;
        }
      }
      if (!added) {
        this.queue.push(ticket);
      }
    }
  }

  public getNextTicket(): Ticket | undefined {
    return this.queue.shift();
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
