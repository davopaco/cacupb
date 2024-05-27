import Appointment from "../../../domain/model/appointment/Appointment";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../../domain/port/driven/repository/CustomerRepositoryPort";
import Time from "../../../domain/model/time/Time";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import { getAppointmentType } from "../../../helper/GetAppointmentType";
import CustomerAppointmentId from "../../../domain/model/web/CustomerAppointmentId";
import Customer from "../../../domain/model/customer/Customer";
import CustomerAppointment from "../../../domain/model/web/CustomerAppointment";
import CustomerServicePort from "../../../domain/port/driver/service/customer/CustomerServicePort";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";

export default class AppointmentService implements AppointmentServicePort {
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly officeRepository: OfficeRepositoryPort,
    private readonly customerService: CustomerServicePort
  ) {}

  public async createAppointmentForCustomer(
    customerAppointment: CustomerAppointment
  ): Promise<boolean> {
    const customerExistence = await this.customerService.validateCustomer(
      customerAppointment.customerId
    );

    const customer = new Customer(
      customerAppointment.name,
      customerAppointment.lastName,
      parseInt(customerAppointment.customerId),
      customerAppointment.address,
      customerAppointment.birthDate,
      await this.appointmentRepository.getAppointmentsAttendedByCustomer(
        parseInt(customerAppointment.customerId)
      )
    );

    const office = await this.officeRepository.getById(
      customerAppointment.place
    );

    if (!customerExistence) {
      const createCustomer = await this.customerRepository.create(customer);
      if (!createCustomer) {
        return false;
      }
    }

    const appointment = new Appointment(
      customer,
      customerAppointment.date,
      new Time(customerAppointment.time),
      getAppointmentType(customerAppointment.type),
      0,
      customerAppointment.description,
      0,
      office
    );

    return await this.appointmentRepository.create(appointment);
  }

  public async changeAppointmentForCustomer(
    customerAppointmentId: CustomerAppointmentId
  ): Promise<boolean> {
    try {
      const customer = new Customer(
        customerAppointmentId.name,
        customerAppointmentId.lastName,
        parseInt(customerAppointmentId.customerId),
        customerAppointmentId.address,
        customerAppointmentId.birthDate,
        await this.appointmentRepository.getAppointmentsAttendedByCustomer(
          parseInt(customerAppointmentId.customerId)
        )
      );

      const customerUpdated = await this.customerRepository.update(customer);

      if (!customerUpdated) {
        return false;
      }

      const office = await this.officeRepository.getById(
        customerAppointmentId.place
      );

      const appointment = new Appointment(
        customer,
        customerAppointmentId.date,
        new Time(customerAppointmentId.time),
        getAppointmentType(customerAppointmentId.type),
        parseInt(customerAppointmentId.id),
        customerAppointmentId.description,
        0,
        office
      );

      return await this.appointmentRepository.update(appointment);
    } catch (error) {
      console.error("Error while changing the appointment", error);
      return false;
    }
  }

  public async cancelAppointmentForCustomer(id: number): Promise<boolean> {
    try {
      return await this.appointmentRepository.delete(id);
    } catch (error) {
      console.error("Error while canceling the appointment", error);
      return false;
    }
  }

  public async getAppointmentByNonAttended(
    status: string
  ): Promise<Appointment[]> {
    return await this.appointmentRepository.getByStatus(parseInt(status));
  }

  public async getAppointmentById(appointmentId: string): Promise<Appointment> {
    return await this.appointmentRepository.getById(parseInt(appointmentId));
  }

  public async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.getAll();
  }
}
