import AppointmentRepositoryPort from "../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../domain/port/driven/repository/CustomerRepositoryPort";
import OfficeRepositoryPort from "../../domain/port/driven/repository/OfficeRepositoryPort";
import TicketRepositoryPort from "../../domain/port/driven/repository/TicketRepositoryPort";
import ValidateServicePort from "../../domain/port/driven/service/ValidateServicePort";

export default class ValidateService implements ValidateServicePort {
  constructor(
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly officeRepository: OfficeRepositoryPort,
    private readonly ticketRepository: TicketRepositoryPort,
    private readonly appointmentRepository: AppointmentRepositoryPort
  ) {}

  public async validateAppointmentForCustomer(
    customerId: string,
    appointmentId: string
  ): Promise<boolean> {
    const customer = await this.customerRepository.getById(
      parseInt(customerId)
    );
    const appointment = await this.appointmentRepository.getById(
      parseInt(appointmentId)
    );
    return customer.getId() === appointment.getCustomer().getId();
  }

  public async validateAppointmentForOffice(
    officeId: string,
    appointmentId: string
  ): Promise<boolean> {
    const office = await this.officeRepository.getById(parseInt(officeId));
    const appointment = await this.appointmentRepository.getById(
      parseInt(appointmentId)
    );
    return office.getId() === appointment.getOffice().getId();
  }

  public async validateTicketForAppointment(
    appointmentId: string,
    ticketId: string
  ): Promise<boolean> {
    const appointment = await this.appointmentRepository.getById(
      parseInt(appointmentId)
    );
    const ticket = this.ticketRepository.getTicketById(
      parseInt(ticketId),
      appointment.getOffice().getId()
    );
    return ticket.getAppointment().getId() === appointment.getId();
  }
}
