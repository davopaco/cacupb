import NullOffice from "../../../domain/model/office/NullOffice";
import Office from "../../../domain/model/office/Office";
import NullTicket from "../../../domain/model/ticket/NullTicket";
import Ticket from "../../../domain/model/ticket/Ticket";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";

export default class PriorityQueue implements TicketRepositoryPort {
  private queue: Map<number, Ticket[]>;
  private office: Map<number, Office>;

  constructor() {
    this.queue = new Map();
    this.office = new Map();
  }

  public addOffice(office: Office): void {
    if (!this.office.has(office.getId())) {
      this.office.set(office.getId(), office);
      this.queue.set(office.getId(), []);
    }
  }

  public getOffice(officeId: number): Office {
    return this.office.get(officeId) || new NullOffice();
  }

  public getQueue(officeId: number): Ticket[] {
    return this.queue.get(officeId) || [];
  }

  public addTicket(ticket: Ticket): void {
    const queue = this.queue.get(ticket.getAppointment().getOffice().getId());
    if (!queue) {
      throw new Error(
        `Place with ID ${ticket.getAppointment().getOffice().getId} does not exist`
      );
    }

    if (queue.length === 0) {
      queue.push(ticket);
    } else {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const currentCustomer = queue[i].getAppointment().getCustomer();
        const newCustomer = ticket.getAppointment().getCustomer();

        if (
          newCustomer.isOldPersonCustomer() &&
          !currentCustomer.isOldPersonCustomer()
        ) {
          queue.splice(i, 0, ticket);
          added = true;
          break;
        }

        if (
          newCustomer.isVipCustomer() &&
          !newCustomer.isOldPersonCustomer() &&
          !currentCustomer.isVipCustomer() &&
          !currentCustomer.isOldPersonCustomer()
        ) {
          queue.splice(i, 0, ticket);
          added = true;
          break;
        }
      }
      if (!added) {
        queue.push(ticket);
      }
    }
  }

  public getNextTicket(officeId: number): Ticket {
    const queue = this.queue.get(officeId);
    if (!queue) {
      throw new Error(`Place with ID ${officeId} does not exist`);
    }
    if (queue.length === 0) {
      return new NullTicket();
    }
    const nextTicket = queue.shift();
    if (nextTicket === undefined) {
      return new NullTicket();
    }
    return nextTicket;
  }

  public isEmpty(officeId: number): boolean {
    const queue = this.queue.get(officeId);
    if (!queue) {
      throw new Error(`Place with ID ${officeId} does not exist`);
    }
    return queue.length === 0;
  }
}
