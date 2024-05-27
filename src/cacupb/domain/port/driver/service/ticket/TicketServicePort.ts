import Ticket from "../../../../model/ticket/Ticket";

export default interface TicketServicePort {
  generateTicket(appointmentId: string): Promise<boolean>;
  getTicketById(ticketId: string, officeId: string): Promise<Ticket>;
  getQueueByAppointmentId(appointmentId: string): Promise<Ticket[]>;
}
