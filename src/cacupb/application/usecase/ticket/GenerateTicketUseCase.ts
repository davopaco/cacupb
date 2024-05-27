import Ticket from "../../../domain/model/ticket/Ticket";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import GenerateTicketUseCasePort from "../../../domain/port/driver/usecase/ticket/GenerateTicketUseCasePort";

export default class GenerateTicketUseCase
  implements GenerateTicketUseCasePort
{
  constructor(private readonly ticketService: TicketServicePort) {}

  public async execute(appointmentId: string): Promise<Ticket> {
    const ticket = await this.ticketService.generateTicket(appointmentId);
    return ticket;
  }
}
