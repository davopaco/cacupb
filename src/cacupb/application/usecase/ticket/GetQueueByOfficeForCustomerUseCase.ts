import Ticket from "../../../domain/model/ticket/Ticket";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import GetQueueByOfficeForCustomerUseCasePort from "../../../domain/port/driver/usecase/ticket/GetQueueByOfficeForCustomerUseCasePort";

export default class GetQueueByOfficeForCustomerUseCase
  implements GetQueueByOfficeForCustomerUseCasePort
{
  constructor(
    private readonly ticketService: TicketServicePort,
    private appointmentService: AppointmentServicePort
  ) {}

  public async execute(
    ticketId: string,
    appointmentId: string
  ): Promise<{ customerTicket: Ticket; allTickets: Ticket[] }> {
    const appointment =
      await this.appointmentService.getAppointmentById(appointmentId);
    const customerTicket = await this.ticketService.getTicketById(
      ticketId,
      appointment.getOffice().getId().toString()
    );
    const allTickets =
      await this.ticketService.getQueueByAppointmentId(appointmentId);
    return { customerTicket, allTickets };
  }
}
