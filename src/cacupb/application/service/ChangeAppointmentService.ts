import Appointment from "../../domain/model/appointment/Appointment";
import Customer from "../../domain/model/customer/Customer";
import CustomerAppointment from "../../domain/model/web/CustomerAppointment";
import AppointmentRepositoryPort from "../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../domain/port/driven/repository/CustomerRepositoryPort";
import Time from "../../domain/model/time/Time";
import OfficeRepositoryPort from "../../domain/port/driven/repository/OfficeRepositoryPort";
import { getAppointmentType } from "../../helper/GetAppointmentType";
import ChangeAppointmentServicePort from "../../domain/port/driver/service/ChangeAppointmentServicePort";

export default class ChangeAppointmentService
  implements ChangeAppointmentServicePort
{
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly officeRepository: OfficeRepositoryPort
  ) {}

  public async changeAppointmentForCustomer(
    customerAppointment: CustomerAppointment
  ): Promise<boolean> {
    try {
      const customer = await this.customerRepository.getById(
        parseInt(customerAppointment.customerId)
      );

      const office = await this.officeRepository.getById(
        customerAppointment.place
      );

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

      return await this.appointmentRepository.update(appointment);
    } catch (error) {
      console.error("Error while changing the appointment", error);
      return false;
    }
  }
}
