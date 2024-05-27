import Ticket from "../../../domain/model/ticket/Ticket";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import { getTicketStatus } from "../../../helper/GetTicketStatus";

export default class TicketService implements TicketServicePort {
  constructor(
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly appointmentService: AppointmentServicePort
  ) {}

  public async generateTicket(appointmentId: string): Promise<boolean> {
    const appointment =
      await this.appointmentService.getAppointmentById(appointmentId);
    const ticket = new Ticket(0, appointment, getTicketStatus("Cola"));
    const addedTicket = this.ticketRepository.addTicket(ticket);
    return addedTicket;
  }

  public async getTicketById(
    ticketId: string,
    officeId: string
  ): Promise<Ticket> {
    return this.ticketRepository.getTicketById(
      parseInt(ticketId),
      parseInt(officeId)
    );
  }

  public async getQueueByAppointmentId(
    appointmentId: string
  ): Promise<Ticket[]> {
    const appointment =
      await this.appointmentService.getAppointmentById(appointmentId);
    return this.ticketRepository.getQueue(appointment.getOffice().getId());
  }
}
