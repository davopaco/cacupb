import NullTicket from "../../../domain/model/ticket/NullTicket";
import Ticket from "../../../domain/model/ticket/Ticket";
import ValidateServicePort from "../../../domain/port/driver/service/ValidateServicePort";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import GenerateTicketUseCasePort from "../../../domain/port/driver/usecase/ticket/GenerateTicketUseCasePort";

export default class GenerateTicketUseCase
  implements GenerateTicketUseCasePort
{
  constructor(
    private readonly ticketService: TicketServicePort,
    private readonly validateService: ValidateServicePort
  ) {}

  public async execute(
    customerId: string,
    appointmentId: string
  ): Promise<Ticket> {
    if (
      await this.validateService.validateAppointmentForCustomer(
        customerId,
        appointmentId
      )
    ) {
      const ticket = await this.ticketService.generateTicket(appointmentId);
      return ticket;
    }
    return new NullTicket();
  }
}
