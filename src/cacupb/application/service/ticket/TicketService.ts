import Appointment from "../../../domain/model/appointment/Appointment";
import { AppointmentStatus } from "../../../domain/model/appointment/types/AppointmentStatus";
import Ticket from "../../../domain/model/ticket/Ticket";
import AdminRepositoryPort from "../../../domain/port/driven/repository/AdminRepositoryPort";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import TicketRepositoryPort from "../../../domain/port/driven/repository/TicketRepositoryPort";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import TicketServicePort from "../../../domain/port/driver/service/ticket/TicketServicePort";
import { getTicketStatus } from "../../../helper/GetTicketStatus";

export default class TicketService implements TicketServicePort {
  constructor(
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly adminRepository: AdminRepositoryPort,
    private readonly appointmentService: AppointmentServicePort
  ) {}

  public async generateTicket(appointmentId: string): Promise<boolean> {
    const appointment =
      await this.appointmentService.getAppointmentById(appointmentId);
    const ticket = new Ticket(0, appointment, getTicketStatus("Cola"));
    const addedTicket = this.ticketRepository.addTicket(ticket);
    return addedTicket;
  }

  public async getNextInQueue(adminId: string): Promise<Ticket> {
    const admin = await this.adminRepository.getById(parseInt(adminId));
    const nextTicket = this.ticketRepository.getNextTicket(
      admin.getOffice().getId()
    );
    admin.setCustomerTicket(nextTicket);
    return nextTicket;
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

  public async registerTicket(
    ticketId: string,
    adminId: string
  ): Promise<boolean> {
    const admin = await this.adminRepository.getById(parseInt(adminId));
    const ticket = this.ticketRepository.getTicketById(
      parseInt(ticketId),
      admin.getOffice().getId()
    );
    const appointment = await this.appointmentRepository.getById(
      ticket.getAppointment().getId()
    );
    if (this.validateTicket(ticketId, admin.getOffice().getId().toString())) {
      const newAppointment = new Appointment(
        appointment.getCustomer(),
        appointment.getDate(),
        appointment.getTime(),
        appointment.getTypeService(),
        appointment.getId(),
        appointment.getDescription(),
        AppointmentStatus.Asisitida,
        appointment.getOffice()
      );
      return await this.appointmentRepository.update(newAppointment);
    }
    return false;
  }

  public validateTicket(ticketId: string, officeId: string): boolean {
    const ticket = this.ticketRepository.getTicketById(
      parseInt(ticketId),
      parseInt(officeId)
    );
    if (ticket.isNull()) {
      return false;
    }
    return true;
  }
}
