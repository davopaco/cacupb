import Ticket from "../../../../model/ticket/Ticket";

export default interface GenerateTicketUseCasePort {
  execute(customerId: string, appointmentId: string): Promise<Ticket>;
}
