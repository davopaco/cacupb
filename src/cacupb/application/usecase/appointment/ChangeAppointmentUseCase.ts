import CustomerAppointmentId from "../../../domain/model/web/CustomerAppointmentId";
import ValidateServicePort from "../../../domain/port/driver/service/ValidateServicePort";
import AppointmentServicePort from "../../../domain/port/driver/service/appointment/AppointmentServicePort";
import ChangeAppointmentUseCasePort from "../../../domain/port/driver/usecase/appointment/ChangeAppointmentUseCasePort";

export default class ChangeAppointmentUseCase
  implements ChangeAppointmentUseCasePort
{
  constructor(
    private readonly appointmentService: AppointmentServicePort,
    private readonly validateService: ValidateServicePort
  ) {}

  public async execute(
    customerAppointmentId: CustomerAppointmentId
  ): Promise<boolean> {
    if (
      await this.validateService.validateAppointmentForCustomer(
        customerAppointmentId.customerId,
        customerAppointmentId.id
      )
    ) {
      return await this.appointmentService.changeAppointmentForCustomer(
        customerAppointmentId
      );
    }
    return false;
  }
}
