import Office from "../../../model/office/Office";
import Ticket from "../../../model/ticket/Ticket";

export default interface TicketRepositoryPort {
  addOffice(office: Office): void;
  getOffice(officeId: number): Office;
  getQueue(officeId: number): Ticket[];
  addTicket(ticket: Ticket): boolean;
  getNextTicket(officeId: number): Ticket;
  isEmpty(officeId: number): boolean;
  getTicketById(ticketId: number, officeId: number): Ticket;
}
