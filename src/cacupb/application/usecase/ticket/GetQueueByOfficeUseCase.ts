import Ticket from "../../../domain/model/ticket/Ticket";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import GetQueueByOfficeUseCasePort from "../../../domain/port/driver/usecase/ticket/GetQueueByOfficeUseCasePort";

export default class GetQueueByOfficeUseCase
  implements GetQueueByOfficeUseCasePort
{
  constructor(private readonly ticketService: TicketServicePort) {}

  public async execute(officeId: string): Promise<Ticket[]> {
    return await this.ticketService.getQueueByOfficeId(officeId);
  }
}
