import Ticket from "../../../../model/ticket/Ticket";

export default interface GenerateTicketUseCasePort {
  execute(appointmentId: string): Promise<Ticket>;
}
