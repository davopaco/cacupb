import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import RegisterTicketUseCasePort from "../../../domain/port/driver/usecase/ticket/RegisterTicketUseCasePort";

export default class RegisterTicketUseCase
  implements RegisterTicketUseCasePort
{
  constructor(private readonly ticketService: TicketServicePort) {}

  public async execute(ticketId: string, adminId: string): Promise<boolean> {
    return await this.ticketService.registerTicket(ticketId, adminId);
  }
}
