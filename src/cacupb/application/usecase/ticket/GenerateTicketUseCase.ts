import ValidateServicePort from "../../../domain/port/driven/service/ValidateServicePort";
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
  ): Promise<boolean> {
    if (
      !(await this.validateService.validateAppointmentForCustomer(
        customerId,
        appointmentId
      ))
    ) {
      const ticket = await this.ticketService.generateTicket(appointmentId);
      return ticket;
    }
    return false;
  }
}
