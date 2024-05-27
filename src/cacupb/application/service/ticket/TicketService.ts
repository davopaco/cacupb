import Ticket from "../../../domain/model/ticket/Ticket";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";

export default class TicketService implements TicketServicePort {
  constructor(private readonly ticketRepository: TicketRepositoryPort) {}

  public async generateTicket(): Promise<Ticket> {
    const ticket = new Ticket();
    this.ticketRepository.addTicket(ticket);
    return ticket;
  }
}
