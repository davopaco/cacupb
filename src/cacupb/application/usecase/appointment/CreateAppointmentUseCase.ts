import CustomerAppointment from "../../../domain/model/web/CustomerAppointment";
import CreateAppointmentServicePort from "../../../domain/port/driver/service/appointment/CreateAppointmentServicePort";
import CreateAppointmentUseCasePort from "../../../domain/port/driver/usecase/appointment/CreateAppointmentUseCasePort";

export default class CreateAppointmentUseCase
  implements CreateAppointmentUseCasePort
{
  constructor(
    private readonly createAppointmentService: CreateAppointmentServicePort
  ) {}

  async execute(customerAppointment: CustomerAppointment): Promise<boolean> {
    return await this.createAppointmentService.createAppointmentForCustomer(
      customerAppointment
    );
  }
}
