import Ticket from "../../../../model/ticket/Ticket";

export default interface TicketServicePort {
  generateTicket(appointmentId: string): Promise<Ticket>;
}
