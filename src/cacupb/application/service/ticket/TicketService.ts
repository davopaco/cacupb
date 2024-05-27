import Ticket from "../../../domain/model/ticket/Ticket";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";
import GetAppointmentsServicePort from "../../../domain/port/driver/service/appointment/GetAppointmentsServicePort";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import { getTicketStatus } from "../../../helper/GetTicketStatus";

export default class TicketService implements TicketServicePort {
  constructor(
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly getAppointmentService: GetAppointmentsServicePort
  ) {}

  public async generateTicket(appointmentId: string): Promise<Ticket> {
    const appointment =
      await this.getAppointmentService.getAppointmentById(appointmentId);
    const ticket = new Ticket(0, appointment, getTicketStatus("Cola"));
    this.ticketRepository.addTicket(ticket);
    return ticket;
  }
}
