import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import NextInQueueUseCasePort from "../../../domain/port/driver/usecase/ticket/NextInQueueUseCasePort";

export default class NextInQueueUseCase implements NextInQueueUseCasePort {
  constructor(private readonly ticketService: TicketServicePort) {}

  public async execute(adminId: string): Promise<boolean> {
    const ticket = await this.ticketService.getNextInQueue(adminId);
    if (!ticket.isNull()) {
      return true;
    }
    return false;
  }
}
