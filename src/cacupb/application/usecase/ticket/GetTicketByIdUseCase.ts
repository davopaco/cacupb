import NullTicket from "../../../domain/model/ticket/NullTicket";
import ValidateServicePort from "../../../domain/port/driven/service/ValidateServicePort";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import GetTicketByIdUseCasePort from "../../../domain/port/driver/usecase/ticket/GetTicketByIdUseCasePort";

export default class GetTicketByIdUseCase implements GetTicketByIdUseCasePort {
  constructor(
    private readonly ticketService: TicketServicePort,
    private readonly validateService: ValidateServicePort
  ) {}

  async execute(ticketId: string, officeId: string) {
    if (
      await this.validateService.validateAppointmentForCustomer(
        ticketId,
        officeId
      )
    ) {
      const ticket = await this.ticketService.getTicketById(ticketId, officeId);
      return ticket;
    }
    return new NullTicket();
  }
}
