import CustomerAppointment from "../../../domain/model/web/CustomerAppointment";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import CreateAppointmentUseCasePort from "../../../domain/port/driver/usecase/appointment/CreateAppointmentUseCasePort";

export default class CreateAppointmentUseCase
  implements CreateAppointmentUseCasePort
{
  constructor(private readonly appointmentService: AppointmentServicePort) {}

  async execute(customerAppointment: CustomerAppointment): Promise<boolean> {
    return await this.appointmentService.createAppointmentForCustomer(
      customerAppointment
    );
  }
}
