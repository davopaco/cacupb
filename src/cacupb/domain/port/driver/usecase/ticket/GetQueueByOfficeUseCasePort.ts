import Ticket from "../../../../model/ticket/Ticket";

export default interface GetQueueByOfficeForCustomerUseCasePort {
  execute(
    ticketId: string,
    appointmentId: string
  ): Promise<{ customerTicket: Ticket; allTickets: Ticket[] }>;
}
