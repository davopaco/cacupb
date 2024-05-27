import Appointment from "../../../domain/model/appointment/Appointment";
import Customer from "../../../domain/model/customer/Customer";
import CustomerAppointment from "../../../domain/model/web/CustomerAppointment";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../../domain/port/driven/repository/CustomerRepositoryPort";
import CreateAppointmentServicePort from "../../../domain/port/driver/service/appointment/CreateAppointmentServicePort";
import Time from "../../../domain/model/time/Time";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import { getAppointmentType } from "../../../helper/GetAppointmentType";

export default class CreateAppointmentService
  implements CreateAppointmentServicePort
{
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly officeRepository: OfficeRepositoryPort
  ) {}

  public async createAppointmentForCustomer(
    customerAppointment: CustomerAppointment
  ): Promise<boolean> {
    const customerExistence = await this.validateCustomer(
      customerAppointment.customerId
    );

    const customer = new Customer(
      customerAppointment.name,
      customerAppointment.lastName,
      parseInt(customerAppointment.customerId),
      customerAppointment.address,
      customerAppointment.birthDate
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

  async validateCustomer(customerId: string): Promise<boolean> {
    const customer = await this.customerRepository.getById(
      parseInt(customerId)
    );
    console.log(customer);
    if (customer.isNull()) {
      return false;
    }
    return true;
  }
}
