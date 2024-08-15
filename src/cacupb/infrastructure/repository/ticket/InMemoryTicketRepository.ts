import Office from "../../../domain/model/office/Office";
import Ticket from "../../../domain/model/ticket/Ticket";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";

export default class InMemoryTicketRepository implements TicketRepositoryPort {
  private ticketCounter: number;

  constructor(private readonly priorityQueue: TicketRepositoryPort) {
    this.ticketCounter = 0;
  }

  public addOffice(office: Office): void {
    this.priorityQueue.addOffice(office);
  }

  public getOffice(officeId: number): Office {
    return this.priorityQueue.getOffice(officeId);
  }

  public addTicket(ticket: Ticket): Ticket {
    ticket.setId(this.generateTicketNumber());
    return this.priorityQueue.addTicket(ticket);
  }

  public getNextTicket(officeId: number): Ticket {
    return this.priorityQueue.getNextTicket(officeId);
  }

  public getQueue(officeId: number): Ticket[] {
    return this.priorityQueue.getQueue(officeId);
  }

  public isEmpty(officeId: number): boolean {
    return this.priorityQueue.isEmpty(officeId);
  }

  private generateTicketNumber(): number {
    return ++this.ticketCounter;
  }

  public getTicketById(ticketId: number, officeId: number): Ticket {
    return this.priorityQueue.getTicketById(ticketId, officeId);
  }
}
