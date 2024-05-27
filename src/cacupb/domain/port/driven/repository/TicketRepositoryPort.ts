import Ticket from "../../../model/ticket/Ticket";

export default interface TicketRepositoryPort {
  addTicket(ticket: Ticket): void;
  getNextTicket(): Ticket | undefined;
  isEmpty(): boolean;
}
