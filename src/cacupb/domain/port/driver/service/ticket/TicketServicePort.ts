import Ticket from "../../../../model/ticket/Ticket";

export default interface TicketServicePort {
  generateTicket(appointmentId: string): Promise<boolean>;
  getQueueByOffice(officeId: string): Promise<Ticket[]>;
  getTicketById(ticketId: string, officeId: string): Promise<Ticket>;
  getQueueByAppointmentId(appointmentId: string): Promise<Ticket[]>;
  registerTicket(ticketId: string, adminId: string): Promise<boolean>;
  validateTicket(ticketId: string, officeId: string): boolean;
  getNextInQueue(adminId: string): Promise<Ticket>;
}
