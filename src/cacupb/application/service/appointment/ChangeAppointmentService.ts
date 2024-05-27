import Appointment from "../../../domain/model/appointment/Appointment";
import AppointmentRepositoryPort from "../../../domain/port/driven/repository/AppointmentRepositoryPort";
import CustomerRepositoryPort from "../../../domain/port/driven/repository/CustomerRepositoryPort";
import Time from "../../../domain/model/time/Time";
import OfficeRepositoryPort from "../../../domain/port/driven/repository/OfficeRepositoryPort";
import { getAppointmentType } from "../../../helper/GetAppointmentType";
import ChangeAppointmentServicePort from "../../../domain/port/driver/service/appointment/ChangeAppointmentServicePort";
import CustomerAppointmentId from "../../../domain/model/web/CustomerAppointmentId";
import Customer from "../../../domain/model/customer/Customer";

export default class ChangeAppointmentService
  implements ChangeAppointmentServicePort
{
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly officeRepository: OfficeRepositoryPort
  ) {}

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
}
