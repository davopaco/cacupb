import Ticket from "../../../../model/ticket/Ticket";

export default interface GetTicketByIdUseCasePort {
  execute(ticketId: string, officeId: string): Promise<Ticket>;
}
